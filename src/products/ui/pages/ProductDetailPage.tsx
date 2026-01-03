import { useParams } from "react-router";
import { useGetProduct } from "@/shared/api/products/products";
import { type Product } from "@/shared/api/model";
import { addToCart } from "@/cart/lib/cart";
import { ProductCard } from "../widgets/ProductCard";

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const { data: productResp } = useGetProduct(productId!);

  if (!productResp) {
    return <div>Loading...</div>;
  }

  const onAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return <ProductCard product={productResp.data} onAddToCart={onAddToCart} />;
};
