import { createBrowserRouter } from "react-router";
import { AppLayout } from "../ui/layouts/AppLayout";
import { ProductsListPage } from "@/products/ui/pages/ProductsListPage";
import { ProductDetailPage } from "@/products/ui/pages/ProductDetailPage";
import { CartPage } from "@/cart/ui/pages/CartPage";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: AppLayout,
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
    ],
  },
]);
