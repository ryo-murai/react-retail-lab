import { createBrowserRouter } from "react-router";
import { AppLayout } from "../ui/layouts/AppLayout";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <AppLayout />,
  },
]);
