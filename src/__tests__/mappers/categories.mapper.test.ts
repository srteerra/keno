import { describe, it, expect } from "vitest";
import { MapCategory } from "@/lib/mappers/categories.mapper";
import { Category } from "@/types/category";

describe("MapCategory.labels", () => {
  it.each([
    [Category.GIT_COMMAND, "Git Command"],
    [Category.TERMINAL, "Terminal"],
    [Category.EDITOR, "Editor"],
    [Category.REACT, "React"],
    [Category.CSS, "CSS"],
  ])("returns correct label for %s", (category, expectedLabel) => {
    expect(MapCategory.labels(category)).toBe(expectedLabel);
  });

  it("returns Unknown for unrecognized category", () => {
    expect(MapCategory.labels("unknown" as Category)).toBe("Unknown");
  });
});

describe("MapCategory.color", () => {
  it("returns a string for every category", () => {
    for (const category of Object.values(Category)) {
      const result = MapCategory.color(category);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it("returns distinct colors for different categories", () => {
    const colors = new Set(Object.values(Category).map(MapCategory.color));
    expect(colors.size).toBeGreaterThan(1);
  });

  it("falls back to base color for unknown category", () => {
    const result = MapCategory.color("unknown" as Category);
    const gitColor = MapCategory.color(Category.GIT_COMMAND);
    expect(result).toBe(gitColor); // GIT_COMMAND uses baseBgColor
  });
});

describe("MapCategory.bgColor", () => {
  it("returns a string for every category", () => {
    for (const category of Object.values(Category)) {
      const result = MapCategory.bgColor(category);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it("returns distinct bg colors for different categories", () => {
    const colors = new Set(Object.values(Category).map(MapCategory.bgColor));
    expect(colors.size).toBeGreaterThan(1);
  });
});
