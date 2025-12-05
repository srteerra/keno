import { GIT_RULES } from "@/lib/prompts/tips/git.prompt";
import { TERMINAL_RULES } from "@/lib/prompts/tips/terminal.prompt";
import { EDITOR_RULES } from "@/lib/prompts/tips/editor.prompt";
import { TipCategory } from "@/types/tip";

export const CATEGORY_RULES: Record<TipCategory, string> = {
  git_command: GIT_RULES,
  terminal: TERMINAL_RULES,
  editor: EDITOR_RULES,
};
