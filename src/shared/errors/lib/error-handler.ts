import type {
  ApiError,
  NetworkError
} from "@/shared/webclient/model/types/error.type";

import type { ErrorInfo } from "../model/error-info.type";
import { fallbackMessage } from "./fallback-error-info";

export function isApiError(error: unknown): error is ApiError {
  if (!error || typeof error !== "object" || !("status" in error)) return false;

  const status = error.status;
  return (
    typeof status === "number" &&
    (status === 0 || status >= 400)
  );
}

export function isNetworkError(error: ApiError): error is NetworkError {
  return "isNetworkError" in error && error.isNetworkError === true;
}

export function resolveErrorMessage(error: unknown): ErrorInfo {
  console.log("Resolving error message for error:", error);
  if (isApiError(error)) {
    if (isNetworkError(error)) { 
      return {
        title: "Network Error",
        detail: `A network error occurred while trying to access the server. Please check your internet connection and try again.`,
      };
    } else {
      return {
        title: error.title || "Server Error",
        detail: error.detail || fallbackMessage.detail,
      };
    }
  }

  return fallbackMessage;
}
