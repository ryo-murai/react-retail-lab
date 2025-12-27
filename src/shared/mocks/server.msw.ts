import { setupWorker } from "msw/browser";
import * as mocks from "@/shared/api/index.msw";

// ブラウザ環境用モックワーカー
const handlers = Object.entries(mocks).flatMap(([, getMock]) => getMock());
export const worker = setupWorker(...handlers);

export const startMockWorker = async () => {
  await worker.start({
    onUnhandledRequest: (request, print) => {
      // api 以外のリクエストは無視する
      if (request.url.startsWith("/api")) {
        print.warning();
      }
    },
  });
};