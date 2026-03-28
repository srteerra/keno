import { describe, it, expect } from "vitest";
import { extractBlockHelper } from "@/lib/helpers/extract-block.helper";

describe("extractBlockHelper", () => {
  it("returns lead from first non-empty line", () => {
    const md = "Use git stash to save changes.\n\n```bash\ngit stash\n```";
    const result = extractBlockHelper(md);
    expect(result.lead).toBe("Use git stash to save changes.");
  });

  it("extracts code block with language", () => {
    const md = "Run this command:\n\n```bash\ngit stash\n```";
    const result = extractBlockHelper(md);
    expect(result.mainCode).toEqual({ lang: "bash", code: "git stash" });
  });

  it("extracts code block without language", () => {
    const md = "Run this:\n\n```\nsome code\n```";
    const result = extractBlockHelper(md);
    expect(result.mainCode?.code).toBe("some code");
    expect(result.mainCode?.lang).toBeUndefined();
  });

  it("returns undefined mainCode when no code block", () => {
    const md = "This is a plain tip with no code block.";
    const result = extractBlockHelper(md);
    expect(result.mainCode).toBeUndefined();
  });

  it("puts text after code block into restMarkdown", () => {
    const md = "Lead line.\n\n```bash\ngit stash\n```\n\nMore details here.";
    const result = extractBlockHelper(md);
    expect(result.restMarkdown).toContain("More details here.");
  });

  it("puts text between lead and code block into restMarkdown", () => {
    const md = "Lead line.\n\nSome middle text.\n\n```bash\ngit stash\n```";
    const result = extractBlockHelper(md);
    expect(result.restMarkdown).toContain("Some middle text.");
  });

  it("handles empty string", () => {
    const result = extractBlockHelper("");
    expect(result.lead).toBe("");
    expect(result.mainCode).toBeUndefined();
    expect(result.restMarkdown).toBe("");
  });

  it("handles markdown with only a code block", () => {
    const md = "```js\nconsole.log('hi')\n```";
    const result = extractBlockHelper(md);
    expect(result.mainCode?.lang).toBe("js");
    expect(result.mainCode?.code).toBe("console.log('hi')");
  });

  it("trims trailing whitespace from code", () => {
    const md = "Lead.\n\n```bash\ngit stash   \n```";
    const result = extractBlockHelper(md);
    expect(result.mainCode?.code).toBe("git stash");
  });
});
