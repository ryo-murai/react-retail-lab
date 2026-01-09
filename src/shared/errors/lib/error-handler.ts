import type {
  ApiErrorKind,
  ApiError,
} from "@/shared/webclient/model/types/error.type";
import type { ErrorInfo } from "../model/error-info.type";
import { fallbackMessage } from "./fallback-error-info";

const API_ERROR_KINDS = [
  "network",
  "http",
] as const satisfies readonly ApiErrorKind[];

export function isApiError(error: unknown): error is ApiError {
  if (!error || typeof error !== "object" || !("kind" in error)) return false;

  const kind = error.kind;
  return (
    typeof kind === "string" &&
    (API_ERROR_KINDS as readonly string[]).includes(kind)
  );
}

export function resolveErrorMessage(error: unknown): ErrorInfo {
  console.log("Resolving error message for error:", error);
  if (isApiError(error)) {
    switch (error.kind) {
      case "network":
        return {
          title: "Network Error",
          detail: `A network error occurred while trying to access the server. Please check your internet connection and try again.`,
        };

      case "http":
        return error.body as ErrorInfo;
    }
  }

  return fallbackMessage;
}
