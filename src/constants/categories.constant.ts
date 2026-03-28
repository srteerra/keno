import { GIT_RULES } from "@/lib/prompts/tips/git.prompt";
import { TERMINAL_RULES } from "@/lib/prompts/tips/terminal.prompt";
import { EDITOR_RULES } from "@/lib/prompts/tips/editor.prompt";
import { REACT_RULES } from "@/lib/prompts/tips/react.prompt";
import { CSS_RULES } from "@/lib/prompts/tips/css.prompt";
import { TYPESCRIPT_RULES } from "@/lib/prompts/tips/typescript.prompt";
import { JAVASCRIPT_RULES } from "@/lib/prompts/tips/javascript.prompt";
import { DOCKER_RULES } from "@/lib/prompts/tips/docker.prompt";
import { DEVTOOLS_RULES } from "@/lib/prompts/tips/devtools.prompt";
import { SQL_RULES } from "@/lib/prompts/tips/sql.prompt";
import { Category } from "@/types/category";

export const CATEGORIES_WITHOUT_EXAMPLES: Category[] = [
  Category.DEVTOOLS,
  Category.DOCKER,
];

export const CATEGORY_RULES: Record<Category, string> = {
  [Category.GIT_COMMAND]: GIT_RULES,
  [Category.TERMINAL]: TERMINAL_RULES,
  [Category.EDITOR]: EDITOR_RULES,
  [Category.REACT]: REACT_RULES,
  [Category.CSS]: CSS_RULES,
  [Category.TYPESCRIPT]: TYPESCRIPT_RULES,
  [Category.JAVASCRIPT]: JAVASCRIPT_RULES,
  [Category.DOCKER]: DOCKER_RULES,
  [Category.DEVTOOLS]: DEVTOOLS_RULES,
  [Category.SQL]: SQL_RULES,
};
