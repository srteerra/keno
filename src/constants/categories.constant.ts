import { GIT_RULES } from "@/lib/prompts/tips/git.prompt";
import { TERMINAL_RULES } from "@/lib/prompts/tips/terminal.prompt";
import { EDITOR_RULES } from "@/lib/prompts/tips/editor.prompt";
import { Category } from "@/types/category";

export const CATEGORY_RULES: Record<Category, string> = {
  [Category.GIT_COMMAND]: GIT_RULES,
  [Category.TERMINAL]: TERMINAL_RULES,
  [Category.EDITOR]: EDITOR_RULES,
  [Category.REACT]: EDITOR_RULES,
  [Category.PYTHON]: EDITOR_RULES,
  [Category.CSS]: EDITOR_RULES,
};
