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

interface GenerateTipRequest {
  category: Category;
}

export async function POST(request: NextRequest) {
  try {
    const { category } = (await request.json()) as GenerateTipRequest;

    if (!isValidCategory(category)) {
      return nextErrorResponse(API_ERRORS.VALIDATION_ERROR);
    }

    const userMsg = buildUserMessage(category);
    const instructions = buildPrompt(category);

    const response = await openai.responses.parse({
      model: process.env.OPENAI_MODEL || "gpt-5-nano",
      instructions,
      max_tokens: Number(process.env.OPENAI_MAX_TOKENS) || 1000,
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

    if ((safe.data.category as Category) !== category) {
      return nextErrorResponse(API_ERRORS.PARSE_ERROR);
    }

    return NextResponse.json(safe.data);
  } catch (error) {
    console.error(error);
    return nextErrorResponse(API_ERRORS.INTERNAL_ERROR);
  }
}
