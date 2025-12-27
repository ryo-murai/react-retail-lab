import { createBrowserRouter } from "react-router";
import { AppLayout } from "../ui/layouts/AppLayout";
import { ProductsListPage } from "@/products/ui/pages/ProductsListPage";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: AppLayout,
    children: [
      {
        id: "products",
        path: "products",
        Component: ProductsListPage,
      },
    ],
  },
]);
