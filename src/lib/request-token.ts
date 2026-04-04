const TOKEN_TTL_MS = 5 * 60 * 1000;

async function hmac(timestamp: number, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(String(timestamp))
  );
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export async function generateToken(): Promise<string> {
  const secret = process.env.API_REQUEST_SECRET;
  if (!secret) throw new Error("API_REQUEST_SECRET not set");
  const timestamp = Date.now();
  const sig = await hmac(timestamp, secret);
  return `${timestamp}.${sig}`;
}

export async function verifyToken(token: string | null): Promise<boolean> {
  const secret = process.env.API_REQUEST_SECRET;
  if (!secret) return true;
  if (!token) return false;

  const dotIndex = token.indexOf(".");
  if (dotIndex === -1) return false;

  const timestampStr = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);
  const timestamp = Number(timestampStr);

  if (isNaN(timestamp)) return false;
  if (Date.now() - timestamp > TOKEN_TTL_MS) return false;

  const expected = await hmac(timestamp, secret);
  return sig === expected;
}
