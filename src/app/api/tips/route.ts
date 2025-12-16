import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/api/openai";
import { TipSchema } from "@/lib/schemas/tip.schema";
import { zodTextFormat } from "openai/helpers/zod";
import { buildPrompt, buildUserMessage } from "@/lib/helpers/prompt.helper";
import type { Category } from "@/types/category";

export async function POST(request: NextRequest) {
  try {
    const { category } = (await request.json()) as { category: Category };

    const userMsg = buildUserMessage(category);
    const instructions = buildPrompt(category);

    const response = await openai.responses.parse({
      model: "gpt-4o",
      instructions,
      input: [{ role: "user", content: userMsg }],
      text: {
        format: zodTextFormat(TipSchema, "zod_schema"),
      },
    });

    const parsed = response.output_parsed;

    if (!parsed) {
      return NextResponse.json(
        { error: "No se pudo parsear la respuesta" },
        { status: 500 }
      );
    }

    const safe = TipSchema.safeParse(parsed);
    if (!safe.success) {
      return NextResponse.json(
        { error: "No se pudo parsear la respuesta" },
        { status: 500 }
      );
    }

    if ((safe.data.category as Category) !== category) {
      return NextResponse.json(
        { error: "No se pudo parsear la respuesta" },
        { status: 500 }
      );
    }

    return NextResponse.json(safe.data);
  } catch (error) {
    console.error("Error generando tips:", error);
    return NextResponse.json(
      { error: "Error al generar tips" },
      { status: 500 }
    );
  }
}
