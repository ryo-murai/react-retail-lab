import type { QueryClient } from "@tanstack/react-query";
import { CART_QUERY_KEYS } from "./query-keys";

export const registerCartQueryDefaults = (queryClient: QueryClient) => {
  queryClient.setQueryDefaults(CART_QUERY_KEYS.items(), {
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}