import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "../styles/App.css";
import { router } from "../routes/router";
import { createAppQueryClient } from "../lib/query-client";

function App() {
  return (
    <QueryClientProvider client={createAppQueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
