import { useTipStore } from "@/stores/Tip.store";
import { Category } from "@/types/category";
import { Tip } from "@/types/tip";

const MAX_RETRIES = 3;
const TOKEN_CACHE_MS = 4 * 60 * 1000;

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getRequestToken(): Promise<string | null> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }
  try {
    const res = await fetch("/api/token");
    if (!res.ok) return null;
    const { token } = (await res.json()) as { token: string | null };
    if (!token) return null;
    cachedToken = { value: token, expiresAt: Date.now() + TOKEN_CACHE_MS };
    return token;
  } catch {
    return null;
  }
}

export const useTips = () => {
  const setTip = useTipStore((state) => state.setTip);
  const clearTip = useTipStore((state) => state.clearTip);

  const getTip = async (category?: Category) => {
    clearTip();

    let activeToken = await getRequestToken();

    const attempt = async (remaining: number): Promise<Tip> => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (activeToken) headers["x-request-token"] = activeToken;

      const res = await fetch("/api/tips", {
        method: "POST",
        headers,
        body: JSON.stringify({ category }),
      });

      if (!res.ok) {
        if (res.status === 403 && remaining > 0) {
          cachedToken = null;
          activeToken = await getRequestToken();
          return attempt(remaining - 1);
        }
        if (res.status === 429) throw new Error("RATE_LIMITED");
        if (res.status >= 500 && remaining > 0) return attempt(remaining - 1);
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error || "Failed to get tip");
      }

      const data = (await res.json()) as Tip;
      setTip(data);
      return data;
    };

    return attempt(MAX_RETRIES - 1);
  };

  return { getTip, clearTip };
};
