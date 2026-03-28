import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CopyButton } from "@/components/ui/CopyButton";
import { useToastStore } from "@/stores/toast.store";

describe("CopyButton", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
    vi.clearAllMocks();
    vi.useFakeTimers();
    useToastStore.setState({ toasts: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a copy button initially", () => {
    render(<CopyButton text="git stash" />);
    expect(screen.getByLabelText("Copiar comando")).toBeInTheDocument();
  });

  it("copies text to clipboard when clicked", async () => {
    render(<CopyButton text="git stash" />);
    await act(async () => {
      fireEvent.click(screen.getByLabelText("Copiar comando"));
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("git stash");
  });

  it("shows a success toast after copying", async () => {
    render(<CopyButton text="git stash" />);
    await act(async () => {
      fireEvent.click(screen.getByLabelText("Copiar comando"));
    });
    const { toasts } = useToastStore.getState();
    expect(
      toasts.some((t) => t.message === "Copied!" && t.type === "success")
    ).toBe(true);
  });

  it("reverts copied state after 1200ms", async () => {
    render(<CopyButton text="git stash" />);

    await act(async () => {
      fireEvent.click(screen.getByLabelText("Copiar comando"));
    });

    expect(screen.getByLabelText("Copiar comando")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.getByLabelText("Copiar comando")).toBeInTheDocument();
  });
});
