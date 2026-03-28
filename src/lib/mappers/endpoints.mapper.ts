import { Category } from "@/types/category";

const endpoints = (category: Category): string => {
  const map: Record<Category, string> = {
    [Category.TERMINAL]: "terminal",
    [Category.EDITOR]: "editor",
    [Category.GIT_COMMAND]: "git",
    [Category.REACT]: "react",
    [Category.CSS]: "css",
    [Category.TYPESCRIPT]: "typescript",
    [Category.JAVASCRIPT]: "javascript",
    [Category.DOCKER]: "docker",
    [Category.DEVTOOLS]: "devtools",
    [Category.SQL]: "sql",
  };

  return map[category] || Category.GIT_COMMAND;
};

export const MapCategoryEndpoints = {
  endpoints,
};
