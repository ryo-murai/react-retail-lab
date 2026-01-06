import { useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useGetProduct } from "@/shared/api/products/products";
import { useAddOrUpdateCartItem } from "@/cart/hooks/useCart";
import { ProductCard } from "../widgets/ProductCard";

// Zod schema for quantity validation
const quantitySchema = z.object({
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(99, "Quantity cannot exceed 99")
    .int("Quantity must be a whole number"),
});

type QuantityFormData = z.infer<typeof quantitySchema>;

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const { data: productResp } = useGetProduct(productId!);
  const { mutate: addToCart } = useAddOrUpdateCartItem();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuantityFormData>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: 1,
    },
  });

  if (!productResp) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data: QuantityFormData) => {
    addToCart({ ...productResp.data, quantity: data.quantity });
    reset(); // Reset form after submission
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, py: 4 }}
      >
        <Box>
          <ProductCard product={productResp.data} />
        </Box>
        <Paper
          elevation={1}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              {productResp.data.name}
            </Typography>
            {productResp.data.category && (
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Category: {productResp.data.category}
              </Typography>
            )}
            {productResp.data.description && (
              <Typography variant="body1" paragraph>
                {productResp.data.description}
              </Typography>
            )}
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold", my: 2 }}
            >
              ${productResp.data.price.toFixed(2)}
            </Typography>
          </Box>

          <Box
            component="form"
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
                  inputProps={{ min: 1, max: 999 }}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                  variant="outlined"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Add to Cart
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
