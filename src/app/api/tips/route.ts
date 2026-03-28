import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/api/openai";
import { TipSchema } from "@/lib/schemas/tip.schema";
import { zodTextFormat } from "openai/helpers/zod";
import {
  buildPrompt,
  buildUserMessage,
  isValidCategory,
} from "@/lib/helpers/prompt.helper";
import type { Category } from "@/types/category";
import { API_ERRORS } from "@/constants/errors.constant";
import { nextErrorResponse } from "@/lib/helpers/nextErrorResponse.helper";
import { getLimiters, getClientIp, isAllowedOrigin } from "@/lib/rate-limit";

interface GenerateTipRequest {
  category: Category;
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return nextErrorResponse(API_ERRORS.FORBIDDEN);
  }

  const limiters = getLimiters();
  if (limiters) {
    try {
      const [globalResult, ipResult] = await Promise.all([
        limiters.global.limit("global"),
        limiters.perIp.limit(getClientIp(request)),
      ]);

      if (!globalResult.success || !ipResult.success) {
        const reset = !globalResult.success
          ? globalResult.reset
          : ipResult.reset;
        const retryAfter = Math.ceil((reset - Date.now()) / 1000);
        return NextResponse.json(
          { error: API_ERRORS.RATE_LIMITED.message },
          {
            status: 429,
            headers: { "Retry-After": String(retryAfter) },
          }
        );
      }
    } catch (e) {
      console.error("[rate-limit] Redis error:", e);
    }
  }

  try {
    const { category } = (await request.json()) as GenerateTipRequest;

    if (!isValidCategory(category)) {
      return nextErrorResponse(API_ERRORS.VALIDATION_ERROR);
    }

    const userMsg = buildUserMessage(category);
    const instructions = buildPrompt(category);

    const response = await openai.responses.parse({
      model: process.env.OPENAI_MODEL || "gpt-5.4-nano",
      instructions,
      input: [{ role: "user", content: userMsg }],
      text: {
        format: zodTextFormat(TipSchema, "zod_schema"),
      },
    });

    const parsed = response.output_parsed;

    if (!parsed) {
      return nextErrorResponse(API_ERRORS.PARSE_ERROR);
    }

    const safe = TipSchema.safeParse(parsed);

    if (!safe.success) {
      return nextErrorResponse(API_ERRORS.PARSE_ERROR);
    }

    return NextResponse.json({ ...safe.data, category });
  } catch (error) {
    console.error(error);
    return nextErrorResponse(API_ERRORS.INTERNAL_ERROR);
  }
}
