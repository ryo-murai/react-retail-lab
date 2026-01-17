import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import "./styles/App.css";
import { router } from "../routes/router";
import { createAppQueryClient } from "../lib/query-client";
import { theme } from "@/shared/ui/config/theme";

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
