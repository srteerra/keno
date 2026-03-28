import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

let ratelimit: Ratelimit | null | undefined = undefined;

export function getRatelimit(): Ratelimit | null {
  if (ratelimit !== undefined) return ratelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.log("[rate-limit] env vars missing, rate limiting disabled");
    ratelimit = null;
    return null;
  }

  try {
    ratelimit = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      prefix: "keno:rl",
    });
  } catch (e) {
    console.error("[rate-limit] init error:", e);
    ratelimit = null;
  }

  return ratelimit;
}

export function getClientIp(request: NextRequest): string {
  const ip = (request as NextRequest & { ip?: string }).ip;
  if (ip) return ip;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "anonymous";
}
