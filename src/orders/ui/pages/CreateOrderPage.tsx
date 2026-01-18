import { zodResolver } from "@hookform/resolvers/zod";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Controller,useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import type { Order,OrderCreate } from "@/shared/api/model";
import { useCreateOrder } from "@/shared/api/orders/orders";
import { resolveErrorMessage } from "@/shared/errors/lib/error-handler";
import { ErrorAlert } from "@/shared/ui/widgets/ErrorAlert";

import { useCartItems, useClearCart } from "@/cart/hooks/useCart";

const deliveryFormSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  deliveryDate: z.string().optional(),
});

type DeliveryFormData = z.infer<typeof deliveryFormSchema>;

export function CreateOrderPage() {
  const { data: cartItems = [], error: cartError } = useCartItems();
  const clearCartMutation = useClearCart();
  const createOrderMutation = useCreateOrder();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      recipientName: "",
      address: "",
      phoneNumber: "",
      deliveryDate: "",
    },
  });

  const total =
    cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const onSubmit = async (deliveryData: DeliveryFormData) => {
    if (cartItems.length === 0) {
      return;
    }

    // Create order payload
    const orderPayload: OrderCreate = {
      userId: "user-1", // TODO: Get from auth context
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      deliveryInfo: {
        recipientName: deliveryData.recipientName,
        address: deliveryData.address,
        phoneNumber: deliveryData.phoneNumber,
        deliveryDate: deliveryData.deliveryDate,
      },
    };

    createOrderMutation.mutate(
      { data: orderPayload as Order },
      {
        onSuccess: async (response) => {
          // Clear cart after successful order creation
          await clearCartMutation.mutateAsync();
          // Navigate to order success page or product listing
          navigate(`/orders/${response.data.id}`, { replace: true });
        },
      }
    );
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h4" component="h1">
            Checkout
          </Typography>
          <Typography color="text.secondary">
            Your cart is empty. Please add items before proceeding to checkout.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <ShoppingCartIcon /> Checkout
        </Typography>

        {cartError && (
          <ErrorAlert error={resolveErrorMessage(cartError)} retry={() => {}} />
        )}

        {createOrderMutation.error && (
          <ErrorAlert
            error={resolveErrorMessage(createOrderMutation.error)}
            retry={() => {}}
          />
        )}

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: 3 }}>
          {/* Order Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {/* Order Items Summary */}
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Order Items
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Product
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Price
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 600 }}>
                            Qty
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Subtotal
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.productId}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">
                              ${item.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="center">
                              {item.quantity}
                            </TableCell>
                            <TableCell align="right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

              {/* Delivery Information Form */}
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Delivery Information
                  </Typography>
                  <Stack spacing={2}>
                    <Controller
                      name="recipientName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Recipient Name"
                          fullWidth
                          error={!!errors.recipientName}
                          helperText={errors.recipientName?.message}
                        />
                      )}
                    />
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Address"
                          fullWidth
                          multiline
                          rows={3}
                          error={!!errors.address}
                          helperText={errors.address?.message}
                        />
                      )}
                    />
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Phone Number"
                          fullWidth
                          error={!!errors.phoneNumber}
                          helperText={errors.phoneNumber?.message}
                        />
                      )}
                    />
                    <Controller
                      name="deliveryDate"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Preferred Delivery Date"
                          type="date"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.deliveryDate}
                          helperText={errors.deliveryDate?.message}
                        />
                      )}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Stack>

            {/* Submit Button */}
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/cart")}
                disabled={isSubmitting || createOrderMutation.isPending}
              >
                Back to Cart
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || createOrderMutation.isPending}
              >
                {createOrderMutation.isPending ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Creating Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </Box>
          </form>

          {/* Order Summary Card */}
          <Paper
            elevation={2}
            sx={{ height: "fit-content", position: "sticky", top: 20 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Order Summary
              </Typography>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography color="text.secondary">Subtotal:</Typography>
                  <Typography>${total.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography color="text.secondary">Shipping:</Typography>
                  <Typography>Free</Typography>
                </Box>
                <Box
                  sx={{
                    borderTop: 1,
                    pt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Total:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "primary.main" }}
                  >
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
}
