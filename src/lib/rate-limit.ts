import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

interface Limiters {
  perIp: Ratelimit;
  global: Ratelimit;
}

let limiters: Limiters | null | undefined = undefined;

export function getLimiters(): Limiters | null {
  if (limiters !== undefined) return limiters;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    limiters = null;
    return null;
  }

  try {
    const redis = new Redis({ url, token });
    limiters = {
      perIp: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "1 m"),
        prefix: "keno:rl:ip",
      }),
      global: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(60, "1 m"),
        prefix: "keno:rl:global",
      }),
    };
  } catch (e) {
    console.error("[rate-limit] init error:", e);
    limiters = null;
  }

  return limiters;
}

export function getClientIp(request: NextRequest): string {
  const ip = (request as NextRequest & { ip?: string }).ip;
  if (ip) return ip;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "anonymous";
}

export function isAllowedOrigin(request: NextRequest): boolean {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) return true;

  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(appUrl).origin;
  } catch {
    return false;
  }
}
