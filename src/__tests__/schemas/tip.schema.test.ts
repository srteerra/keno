import { describe, it, expect } from "vitest";
import { TipSchema, ExampleSchema } from "@/lib/schemas/tip.schema";
import { Category } from "@/types/category";

const validTip = {
  title: "Use git stash to save work in progress",
  description: "Temporarily save uncommitted changes without a commit.",
  content_markdown:
    "Use `git stash` to save your work.\n\n```bash\ngit stash\n```",
  category: Category.GIT_COMMAND,
  examples: [
    {
      explanation: "Stash with a message",
      details_markdown: "`git stash save 'message'`",
    },
    { explanation: "List all stashes", details_markdown: "`git stash list`" },
  ],
};

describe("ExampleSchema", () => {
  it("accepts a valid example", () => {
    const result = ExampleSchema.safeParse({
      explanation: "Test explanation",
      details_markdown: "```bash\necho hello\n```",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing explanation", () => {
    const result = ExampleSchema.safeParse({ details_markdown: "some md" });
    expect(result.success).toBe(false);
  });

  it("rejects missing details_markdown", () => {
    const result = ExampleSchema.safeParse({ explanation: "Test" });
    expect(result.success).toBe(false);
  });
});

describe("TipSchema", () => {
  it("accepts a valid tip", () => {
    const result = TipSchema.safeParse(validTip);
    expect(result.success).toBe(true);
  });

  it("parses all valid categories", () => {
    for (const category of Object.values(Category)) {
      const result = TipSchema.safeParse({ ...validTip, category });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid category", () => {
    const result = TipSchema.safeParse({ ...validTip, category: "invalid" });
    expect(result.success).toBe(false);
  });

  it("rejects fewer than 2 examples", () => {
    const result = TipSchema.safeParse({
      ...validTip,
      examples: [{ explanation: "Only one", details_markdown: "md" }],
    });
    expect(result.success).toBe(false);
  });

  it("accepts 3 or more examples", () => {
    const result = TipSchema.safeParse({
      ...validTip,
      examples: [
        ...validTip.examples,
        { explanation: "Third example", details_markdown: "`git stash drop`" },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing title", () => {
    const { title: _t, ...rest } = validTip;
    const result = TipSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects missing description", () => {
    const { description: _d, ...rest } = validTip;
    const result = TipSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects missing content_markdown", () => {
    const { content_markdown: _c, ...rest } = validTip;
    const result = TipSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("infers correct TypeScript type", () => {
    const result = TipSchema.safeParse(validTip);
    if (result.success) {
      const tip = result.data;
      expect(tip.category).toBe(Category.GIT_COMMAND);
      expect(Array.isArray(tip.examples)).toBe(true);
    }
  });
});
