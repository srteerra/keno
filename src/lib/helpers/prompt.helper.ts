import { CATEGORY_RULES } from "@/constants/categories.constant";
import { BASE_INSTRUCTIONS } from "@/lib/prompts/tips/instructions.prompt";
import { TipCategory } from "@/types/tip";

const USER_MESSAGES: Record<TipCategory, string> = {
  git_command: "Give me a Git tip",
  terminal: "Give me a terminal/shell tip",
  editor: "Give me a code editor tip",
};

export const buildPrompt = (category: TipCategory): string => {
  const categoryRules = CATEGORY_RULES[category];

  if (!categoryRules) {
    throw new Error(`Unknown category: ${category}`);
  }

  return `${BASE_INSTRUCTIONS}\n\n${categoryRules}`;
};

export const buildUserMessage = (category: TipCategory): string => {
  return USER_MESSAGES[category];
};

export const isValidCategory = (category: string): category is TipCategory => {
  const validCategories: TipCategory[] = ["git_command", "terminal", "editor"];
  return validCategories.includes(category as TipCategory);
};
