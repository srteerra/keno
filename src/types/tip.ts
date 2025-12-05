import { Category } from "@/types/category";

export interface Example {
  explanation: string;
  details_markdown: string;
}

export interface Tip {
  title: string;
  description: string;
  content_markdown: string;
  examples: Example[];
  category: Category;
}
