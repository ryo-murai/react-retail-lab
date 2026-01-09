import { useParams, useNavigate, Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Container } from "@mui/material";
import { useGetProduct } from "@/shared/api/products/products";
import { useCartItem, useAddOrUpdateCartItem } from "@/cart/hooks/useCart";
import {
  type CartItemFormData,
  cartItemFormSchema,
} from "@/cart/model/types/cart-item-form.schema";
import { ProductCard } from "../widgets/ProductCard";
import { ErrorAlert } from "@/shared/ui/widgets/ErrorAlert";
import { resolveErrorMessage } from "@/shared/errors/lib/error-handler";

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const {
    data: productResp,
    error,
    refetch,
  } = useGetProduct(productId!, {
    query: { enabled: !!productId },
  });
  const { data: currentCartItem } = useCartItem(productId!);
  const { mutate: addToCart } = useAddOrUpdateCartItem();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CartItemFormData>({
    resolver: zodResolver(cartItemFormSchema),
    defaultValues: {
      quantity: currentCartItem?.quantity || 1,
    },
  });

  const onSubmit = (data: CartItemFormData) => {
    if (!productResp) return;
    addToCart({ ...productResp.data, quantity: data.quantity });
    navigate("/cart");
  };

  return (
    <Container maxWidth="lg">
      <Box
        component={Link}
        to="/products"
        sx={{ textDecoration: "none", textAlign: "left" }}
      >
        {"< products"}
      </Box>
      {error && (
        <ErrorAlert error={resolveErrorMessage(error)} retry={refetch} />
      )}
      {productResp && (
        <ProductCard product={productResp.data}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Quantity"
                  type="number"
                  slotProps={{ htmlInput: { min: 1, max: 99 } }}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                  variant="outlined"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  size="small"
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Add to Cart
            </Button>
          </Box>
        </ProductCard>
      )}
    </Container>
  );
};
