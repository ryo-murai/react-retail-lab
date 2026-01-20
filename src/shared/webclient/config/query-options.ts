import { type QueryClientConfig } from "@tanstack/react-query";

const maxRetries = 3;
const minDelay = 200; // in milliseconds
const maxDelay = 30000; // in milliseconds

const is5xx = (status: number) => status >= 500 && status < 600;

export const defaultOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // online
      networkMode: "online",

      // refetch on reconnect
      refetchOnReconnect: true,

      // no refetch on window focus
      refetchOnWindowFocus: false,

      // default cache time
      staleTime: 0,

      // retry on condition
      retry: (failureCount, error) => {
        if ("status" in error === false || typeof error.status !== "number") {
          // retry on unknown errors
          return failureCount < maxRetries;
        }

        const status = error.status;

        // retry on server error response(5xx), Too Many Requests(429) and Request Timeout(408)
        if (is5xx(status) || status === 429 || status === 408 || status === 0) {
          return failureCount < maxRetries;
        }

        // no retry on other errors
        return false;
      },

      // exponential backoff retry delay
      retryDelay: (attemptIndex) => {
        return Math.min(minDelay * 2 ** attemptIndex, maxDelay);
      },
    },
  },
};
