import { describe, it, expect, beforeEach } from "vitest";
import { useTipStore } from "@/stores/Tip.store";
import { Category } from "@/types/category";
import type { Tip } from "@/types/tip";

const mockTip: Tip = {
  title: "Test tip",
  description: "A test description.",
  content_markdown: "```bash\ngit stash\n```",
  category: Category.GIT_COMMAND,
  examples: [
    { explanation: "Example 1", details_markdown: "`git stash`" },
    { explanation: "Example 2", details_markdown: "`git stash pop`" },
  ],
};

describe("useTipStore", () => {
  beforeEach(() => {
    useTipStore.setState({ tip: null, showExamples: false });
  });

  it("initialises with null tip and hidden examples", () => {
    const { tip, showExamples } = useTipStore.getState();
    expect(tip).toBeNull();
    expect(showExamples).toBe(false);
  });

  it("setTip stores the tip", () => {
    useTipStore.getState().setTip(mockTip);
    expect(useTipStore.getState().tip).toEqual(mockTip);
  });

  it("clearTip removes the tip", () => {
    useTipStore.getState().setTip(mockTip);
    useTipStore.getState().clearTip();
    expect(useTipStore.getState().tip).toBeNull();
  });

  it("showExamplesToggle toggles showExamples from false to true", () => {
    useTipStore.getState().showExamplesToggle();
    expect(useTipStore.getState().showExamples).toBe(true);
  });

  it("showExamplesToggle toggles showExamples back to false", () => {
    useTipStore.getState().showExamplesToggle();
    useTipStore.getState().showExamplesToggle();
    expect(useTipStore.getState().showExamples).toBe(false);
  });

  it("setTip replaces an existing tip", () => {
    const anotherTip: Tip = {
      ...mockTip,
      title: "Another tip",
      category: Category.REACT,
    };
    useTipStore.getState().setTip(mockTip);
    useTipStore.getState().setTip(anotherTip);
    expect(useTipStore.getState().tip?.title).toBe("Another tip");
  });
});
