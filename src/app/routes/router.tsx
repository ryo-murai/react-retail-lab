import { createBrowserRouter } from "react-router";
import { AppLayout } from "../ui/layouts/AppLayout";
import { ProductsListPage } from "@/products/ui/pages/ProductsListPage";
import { ProductDetailPage } from "@/products/ui/pages/ProductDetailPage";
import { CartPage } from "@/cart/ui/pages/CartPage";
import NotFoundPage from "@/shared/ui/pages/errors/NotFoundPage";
import { ErrorBoundary } from "@/shared/errors/boundary/ErrorBoundary";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: AppLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      // products
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

      // cart
      {
        id: "cart",
        path: "cart",
        Component: CartPage,
      },

      // fallback
      {
        id: "fallback",
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
