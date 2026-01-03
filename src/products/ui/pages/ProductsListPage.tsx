import { useNavigate } from "react-router";
import { useListProducts } from "@/shared/api/products/products";
import { type Product } from "@/shared/api/model";
import { addToCart } from "@/cart/lib/cart";
import { ProductCard } from "../widgets/ProductCard";

export const ProductsListPage = () => {
  const navigate = useNavigate();
  const { data: productsResp } = useListProducts();

  const onProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const onAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  if (!productsResp) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {productsResp?.data.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
