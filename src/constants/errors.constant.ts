export const API_ERRORS = {
  PARSE_ERROR: {
    message: "Error parsing data",
    status: 500,
  },
  VALIDATION_ERROR: {
    message: "Invalid input data",
    status: 400,
  },
  NOT_FOUND: {
    message: "Not found",
    status: 404,
  },
  UNAUTHORIZED: {
    message: "Not authorized",
    status: 401,
  },
  INTERNAL_ERROR: {
    message: "Internal server error",
    status: 500,
  },
  RATE_LIMITED: {
    message: "Too many requests. Please try again later.",
    status: 429,
  },
  FORBIDDEN: {
    message: "Forbidden",
    status: 403,
  },
} as const;
