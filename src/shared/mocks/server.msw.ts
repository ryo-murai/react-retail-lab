import { setupWorker } from "msw/browser";
import * as mocks from "@/shared/api/index.msw";

// Mock worker for browser environment
const handlers = Object.entries(mocks).flatMap(([, getMock]) => getMock());
export const worker = setupWorker(...handlers);

export const startMockWorker = async () => {
  await worker.start({
    onUnhandledRequest: (request, print) => {
      // Ignore requests that are not API calls
      if (request.url.startsWith("/api")) {
        print.warning();
      }
    },
  });
};