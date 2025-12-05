export interface Tip {
  id: string;
  title: string;
  content: string;
  category: TipCategory;
}

export type TipCategory = "git_command" | "terminal" | "editor";
