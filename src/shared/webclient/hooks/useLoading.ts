import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export const useIsLoading = () => {
  const isFetching = useIsFetching({predicate: (query) => query.meta?.globalLoadingIndicator !== false});
  const isMutating = useIsMutating({predicate: (mutation) => mutation.meta?.globalLoadingIndicator !== false});

  return isFetching > 0 || isMutating > 0;
};