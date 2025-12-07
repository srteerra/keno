import { z } from "zod";

export const CategorySchema = z.enum([
  "git_command",
  "editor",
  "terminal",
  "react",
  "css",
  "python",
]);

export const ExampleSchema = z.object({
  explanation: z.string(),
  details_markdown: z.string(),
});

export const TipSchema = z.object({
  title: z.string(),
  description: z.string(),
  content_markdown: z.string(),
  category: CategorySchema,
  examples: z.array(ExampleSchema).min(1),
});
