import { useRouteError } from "react-router";

import AppErrorPage from "@/shared/ui/pages/errors/AppErrorPage";
import FallbackErrorPage from "@/shared/ui/pages/errors/FallbackErrorPage";
import NotFoundPage from "@/shared/ui/pages/errors/NotFoundPage";

import { isApiError, resolveErrorMessage } from "../lib/error-handler";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isApiError(error)) {
    switch (error.status) {
      case 404:
        return <NotFoundPage />;

      // 401:
      // 403:

      default:
        return <AppErrorPage message={resolveErrorMessage(error)} />;
    }
  }

  // Fallback for other errors
  const message = resolveErrorMessage(error);
  return <FallbackErrorPage message={message} />;
}
