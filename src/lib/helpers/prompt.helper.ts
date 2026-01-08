import { CATEGORY_RULES } from "@/constants/categories.constant";
import { BASE_INSTRUCTIONS } from "@/lib/prompts/tips/instructions.prompt";
import { Category } from "@/types/category";

const USER_MESSAGES: Record<Category, string> = {
  [Category.GIT_COMMAND]: "Give me a Git tip",
  [Category.TERMINAL]: "Give me a terminal/shell tip",
  [Category.EDITOR]: "Give me a code editor tip",
  [Category.REACT]: "Give me a React tip",
  [Category.CSS]: "Give me a CSS tip",
};

export const buildPrompt = (category: Category): string => {
  const categoryRules = CATEGORY_RULES[category];

  if (!categoryRules) {
    throw new Error(`Unknown category: ${category}`);
  }

  return `${BASE_INSTRUCTIONS}\n\n${categoryRules}`;
};

export const buildUserMessage = (category: Category): string => {
  return USER_MESSAGES[category];
};

export const isValidCategory = (category: string): category is Category => {
  const validCategories: Category[] = [
    Category.GIT_COMMAND,
    Category.TERMINAL,
    Category.EDITOR,
    Category.REACT,
    Category.CSS,
  ];

  return validCategories.includes(category as Category);
};
