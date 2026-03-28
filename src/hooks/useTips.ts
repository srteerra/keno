import { useTipStore } from "@/stores/Tip.store";
import { Category } from "@/types/category";
import { Tip } from "@/types/tip";

const MAX_RETRIES = 3;

export const useTips = () => {
  const setTip = useTipStore((state) => state.setTip);
  const clearTip = useTipStore((state) => state.clearTip);

  const getTip = async (category?: Category) => {
    clearTip();

    const attempt = async (remaining: number): Promise<Tip> => {
      const res = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });

      if (!res.ok) {
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
