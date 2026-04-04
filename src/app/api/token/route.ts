import { type NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/request-token";
import { isAllowedOrigin } from "@/lib/rate-limit";
import { API_ERRORS } from "@/constants/errors.constant";
import { nextErrorResponse } from "@/lib/helpers/nextErrorResponse.helper";

export async function GET(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return nextErrorResponse(API_ERRORS.FORBIDDEN);
  }

  if (!process.env.API_REQUEST_SECRET) {
    return NextResponse.json({ token: null });
  }

  const token = await generateToken();
  return NextResponse.json({ token });
}
