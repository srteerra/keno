import { describe, it, expect, vi, beforeEach } from "vitest";
import { API_ERRORS } from "@/constants/errors.constant";

// Mock next/server before importing the helper
vi.mock("next/server", () => ({
  NextResponse: {
    json: vi.fn((body: unknown, init?: { status?: number }) => ({
      body,
      status: init?.status,
    })),
  },
}));

import { nextErrorResponse } from "@/lib/helpers/nextErrorResponse.helper";
import { NextResponse } from "next/server";

describe("nextErrorResponse", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls NextResponse.json with the error message and status", () => {
    nextErrorResponse(API_ERRORS.VALIDATION_ERROR);
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Invalid input data" },
      { status: 400 }
    );
  });

  it("uses custom message when provided", () => {
    nextErrorResponse(API_ERRORS.INTERNAL_ERROR, "Custom error");
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Custom error" },
      { status: 500 }
    );
  });

  it("returns the result of NextResponse.json", () => {
    const mockResult = { body: { error: "Not found" }, status: 404 };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (NextResponse.json as any).mockReturnValue(mockResult);
    const result = nextErrorResponse(API_ERRORS.NOT_FOUND);
    expect(result).toBe(mockResult);
  });

  it.each([
    ["PARSE_ERROR", API_ERRORS.PARSE_ERROR, 500],
    ["VALIDATION_ERROR", API_ERRORS.VALIDATION_ERROR, 400],
    ["NOT_FOUND", API_ERRORS.NOT_FOUND, 404],
    ["UNAUTHORIZED", API_ERRORS.UNAUTHORIZED, 401],
    ["INTERNAL_ERROR", API_ERRORS.INTERNAL_ERROR, 500],
  ] as const)("uses correct status for %s", (_name, error, expectedStatus) => {
    nextErrorResponse(error);
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: error.message },
      { status: expectedStatus }
    );
  });
});
