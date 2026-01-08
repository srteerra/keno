import { NextResponse } from "next/server";
import { API_ERRORS } from "@/constants/errors.constant";

export const nextErrorResponse = (
  error: (typeof API_ERRORS)[keyof typeof API_ERRORS],
  customMessage?: string
) => {
  return NextResponse.json(
    { error: customMessage || error.message },
    { status: error.status }
  );
};
