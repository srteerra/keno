import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryBadge } from "@/components/tips/category-badge";
import { Category } from "@/types/category";

describe("CategoryBadge", () => {
  it.each([
    [Category.GIT_COMMAND, "Git Command"],
    [Category.TERMINAL, "Terminal"],
    [Category.EDITOR, "Editor"],
    [Category.REACT, "React"],
    [Category.CSS, "CSS"],
  ])("renders the correct label for %s", (category, label) => {
    render(<CategoryBadge type={category} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    const { container } = render(
      <CategoryBadge type={Category.GIT_COMMAND} onClick={onClick} />
    );
    fireEvent.click(container.firstChild as Element);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not throw when onClick is not provided", () => {
    expect(() => {
      const { container } = render(<CategoryBadge type={Category.REACT} />);
      fireEvent.click(container.firstChild as Element);
    }).not.toThrow();
  });

  it("applies cursor-pointer class when onClick is provided", () => {
    const { container } = render(
      <CategoryBadge type={Category.CSS} onClick={() => {}} />
    );
    expect(container.firstChild).toHaveClass("cursor-pointer");
  });

  it("does not apply cursor-pointer class when onClick is not provided", () => {
    const { container } = render(<CategoryBadge type={Category.CSS} />);
    expect(container.firstChild).not.toHaveClass("cursor-pointer");
  });

  it("applies inline style with bgColor and color", () => {
    const { container } = render(<CategoryBadge type={Category.REACT} />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.style.backgroundColor).toBeTruthy();
    expect(badge.style.color).toBeTruthy();
  });
});
