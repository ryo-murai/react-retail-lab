import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

import { theme } from "@/shared/ui/config/theme";

import { createAppQueryClient } from "../lib/query-client";
import { router } from "../routes/router";
import "./styles/App.css";

function App() {
  return (
    <QueryClientProvider client={createAppQueryClient()}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
