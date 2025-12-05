import { z } from "zod";

export const TipCategorySchema = z.enum([
  "react",
  "git_command",
  "linux",
  "terminal",
  "editor",
  "python",
]);

export const DifficultySchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);

export const TipSchema = z.object({
  title: z.string().max(100),
  content: z.string().max(500),
  category: TipCategorySchema,
  difficulty: DifficultySchema,
  tags: z.array(z.string()).max(5),
  codeExample: z.string().optional().nullable(),
});

export type Tip = z.infer<typeof TipSchema>;
