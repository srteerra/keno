import { createHighlighter, Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter>;

export async function highlight(code: string, lang?: string) {
  if (highlighterPromise === undefined) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: [
        "bash",
        "sh",
        "git",
        "javascript",
        "typescript",
        "json",
        "powershell",
        "yaml",
        "markdown",
      ],
    });
  }

  const highlighter = await highlighterPromise;
  const safeLang =
    lang && highlighter.getLoadedLanguages().includes(lang) ? lang : "bash";

  return highlighter.codeToHtml(code, {
    lang: safeLang,
    theme: "github-dark",
  });
}
