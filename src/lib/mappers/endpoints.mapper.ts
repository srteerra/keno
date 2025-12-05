import { Category } from "@/types/category";

const endpoints = (category: Category): string => {
  const map: Record<Category, string> = {
    [Category.TERMINAL]: "terminal",
    [Category.EDITOR]: "editor",
    [Category.GIT_COMMAND]: "git",
  };

  return map[category] || Category.GIT_COMMAND;
};

export const MapCategoryEndpoints = {
  endpoints,
};
