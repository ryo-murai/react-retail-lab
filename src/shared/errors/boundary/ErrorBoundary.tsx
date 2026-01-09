import { useRouteError } from "react-router";
import { isApiError, resolveErrorMessage } from "../lib/error-handler";
import NotFoundPage from "@/shared/ui/pages/errors/NotFoundPage";
import AppErrorPage from "@/shared/ui/pages/errors/AppErrorPage";
import FallbackErrorPage from "@/shared/ui/pages/errors/FallbackErrorPage";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isApiError(error)) {
    if (error.kind == "http") {
      switch (error.status) {
        case 404:
          return <NotFoundPage />;

        // 401:
        // 403:

        default:
          return <AppErrorPage message={resolveErrorMessage(error)} />;
      }
    } else {
      return <AppErrorPage message={resolveErrorMessage(error)} />;
    }
  }

  // Fallback for other errors
  const message = resolveErrorMessage(error);
  return <FallbackErrorPage message={message} />;
}
