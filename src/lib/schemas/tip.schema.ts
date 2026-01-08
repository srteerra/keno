import { z } from "zod";
import { Category } from "@/types/category";

export const ExampleSchema = z.object({
  explanation: z.string(),
  details_markdown: z.string(),
});

export const TipSchema = z.object({
  title: z.string(),
  description: z.string(),
  content_markdown: z.string(),
  category: z.enum(Category),
  examples: z.array(ExampleSchema).min(2),
});
