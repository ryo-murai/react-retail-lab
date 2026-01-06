import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { useListProducts } from "@/shared/api/products/products";
import { type Product } from "@/shared/api/model";
import { useAddOrUpdateCartItem } from "@/cart/hooks/useCart";
import { ProductCard } from "../widgets/ProductCard";

export const ProductsListPage = () => {
  const navigate = useNavigate();
  const { data: productsResp } = useListProducts();
  const { mutate: addToCart } = useAddOrUpdateCartItem();

  const onProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const onAddToCart = (product: Product) => (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
  };

  if (!productsResp) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {productsResp?.data.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          onClick={onProductClick}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </ProductCard>
      ))}
    </div>
  );
};
