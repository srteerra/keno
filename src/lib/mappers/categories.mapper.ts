import { Category } from "@/types/category";

const baseBgColor = "rgba(190,103,34,0.22)";
const baseColor = "#ffc68e";

const bgColor = (category: Category): string => {
  const map: Record<Category, string> = {
    [Category.TERMINAL]: "rgba(121,44,44,0.52)",
    [Category.EDITOR]: "rgba(44,91,107,0.36)",
    [Category.GIT_COMMAND]: baseBgColor,
    [Category.REACT]: "rgba(97,218,251,0.22)",
    [Category.CSS]: "rgba(38,77,228,0.22)",
  };

  return map[category] || baseBgColor;
};

const color = (category: Category): string => {
  const map: Record<Category, string> = {
    [Category.TERMINAL]: "#ff8181",
    [Category.EDITOR]: "#9cdcff",
    [Category.GIT_COMMAND]: baseColor,
    [Category.REACT]: "#61dafb",
    [Category.CSS]: "#264de4",
  };

  return map[category] || baseColor;
};

const labels = (category: Category): string => {
  const map: Record<Category, string> = {
    [Category.TERMINAL]: "Terminal",
    [Category.EDITOR]: "Editor",
    [Category.GIT_COMMAND]: "Git Command",
    [Category.REACT]: "React",
    [Category.CSS]: "CSS",
  };

  return map[category] || "Unknown";
};

export const MapCategory = {
  bgColor,
  color,
  labels,
};
