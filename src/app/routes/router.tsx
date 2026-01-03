import { createBrowserRouter } from "react-router";
import { AppLayout } from "../ui/layouts/AppLayout";
import { ProductsListPage } from "@/products/ui/pages/ProductsListPage";
import { ProductDetailPage } from "@/products/ui/pages/ProductDetailPage";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: AppLayout,
    children: [
      {
        id: "products",
        path: "products",
        children: [
          {
            id: "productsList",
            index: true,
            Component: ProductsListPage,
          },
          {
            id: "productDetail",
            path: ":productId",
            Component: ProductDetailPage,
          },
        ],
      },
    ],
  },
]);
