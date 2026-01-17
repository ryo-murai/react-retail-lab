import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/ui/styles/index.css";
import App from "./app/ui/App.tsx";

/* launch MSW in development mode */
if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
  const { startMockWorker } = await import("./shared/mocks/server.msw.ts");
  await startMockWorker();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
