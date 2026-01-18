import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";

import { type Product } from "@/shared/api/model";
import { useListProducts } from "@/shared/api/products/products";
import { resolveErrorMessage } from "@/shared/errors/lib/error-handler";
import { ErrorAlert } from "@/shared/ui/widgets/ErrorAlert";

import { useAddOrUpdateCartItem } from "@/cart/hooks/useCart";

import { ProductCard } from "../widgets/ProductCard";

export const ProductsListPage = () => {
  const navigate = useNavigate();
  const { data: productsResp, error } = useListProducts();
  const { mutate: addToCart } = useAddOrUpdateCartItem();

  const onProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const onAddToCart = (product: Product) => (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
  };

  // TODO: show search / filter UI while loading
  if (!productsResp) {
    return null;
  }

  return (
    <Box>
      {error && <ErrorAlert error={resolveErrorMessage(error)} />}
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
    </Box>
  );
};
