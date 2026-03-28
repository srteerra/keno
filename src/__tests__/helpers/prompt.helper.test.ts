import { describe, it, expect } from "vitest";
import {
  buildPrompt,
  buildUserMessage,
  isValidCategory,
} from "@/lib/helpers/prompt.helper";
import { Category } from "@/types/category";

describe("isValidCategory", () => {
  it.each(Object.values(Category))("accepts valid category: %s", (category) => {
    expect(isValidCategory(category)).toBe(true);
  });

  it("rejects unknown string", () => {
    expect(isValidCategory("unknown")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isValidCategory("")).toBe(false);
  });

  it("rejects partial match", () => {
    expect(isValidCategory("git")).toBe(false);
  });
});

describe("buildUserMessage", () => {
  it("returns a non-empty string for each valid category", () => {
    for (const category of Object.values(Category)) {
      const msg = buildUserMessage(category);
      expect(typeof msg).toBe("string");
      expect(msg.length).toBeGreaterThan(0);
    }
  });

  it("includes a topic hint in the message", () => {
    for (const category of Object.values(Category)) {
      const msg = buildUserMessage(category);
      expect(msg).toContain("Topic to cover:");
    }
  });

  it("produces different messages across calls for the same category", () => {
    const results = new Set(
      Array.from({ length: 20 }, () => buildUserMessage(Category.TYPESCRIPT))
    );
    expect(results.size).toBeGreaterThan(1);
  });

  it("messages differ between categories", () => {
    const git = buildUserMessage(Category.GIT_COMMAND);
    const ts = buildUserMessage(Category.TYPESCRIPT);
    expect(git.startsWith("Give me a Git tip")).toBe(true);
    expect(ts.startsWith("Give me a TypeScript tip")).toBe(true);
  });
});

describe("buildPrompt", () => {
  it("returns a non-empty string for each valid category", () => {
    for (const category of Object.values(Category)) {
      const prompt = buildPrompt(category);
      expect(typeof prompt).toBe("string");
      expect(prompt.length).toBeGreaterThan(0);
    }
  });

  it("includes base instructions in all prompts", () => {
    const gitPrompt = buildPrompt(Category.GIT_COMMAND);
    const cssPrompt = buildPrompt(Category.CSS);
    expect(gitPrompt).toContain("\n\n");
    expect(cssPrompt).toContain("\n\n");
  });

  it("returns different prompts for different categories", () => {
    const gitPrompt = buildPrompt(Category.GIT_COMMAND);
    const reactPrompt = buildPrompt(Category.REACT);
    expect(gitPrompt).not.toBe(reactPrompt);
  });

  it("throws for an unknown category", () => {
    expect(() => buildPrompt("invalid" as Category)).toThrow();
  });
});
