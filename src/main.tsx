import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import App from "./app/ui/App.tsx";

/* 開発環境では MSW を起動 */
if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
  const { startMockWorker } = await import("./shared/mocks/server.msw.ts");
  await startMockWorker();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
