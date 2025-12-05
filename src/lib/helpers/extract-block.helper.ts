export type ParsedBlocks = {
  lead: string;
  mainCode?: { lang?: string; code: string };
  restMarkdown: string;
};

export function extractBlockHelper(md: string): ParsedBlocks {
  const lines = md.split("\n");
  const firstNonEmpty = lines.find((l) => l.trim().length > 0) ?? "";
  const lead = firstNonEmpty.trim();
  const fence = /```(\w+)?\n([\s\S]*?)```/m;
  const match = md.match(fence);
  if (!match) {
    return {
      lead,
      mainCode: undefined,
      restMarkdown: md.replace(lead, "").trim(),
    };
  }
  const lang = match[1];
  const code = match[2]?.trimEnd() ?? "";
  const before = md.slice(0, match.index!).replace(lead, "").trim();
  const after = md.slice(match.index! + match[0].length).trim();
  const restMarkdown = [before, after].filter(Boolean).join("\n\n").trim();
  return { lead, mainCode: { lang, code }, restMarkdown };
}
