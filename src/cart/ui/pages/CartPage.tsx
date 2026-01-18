import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  Card,
  CardContent,
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
import { Link } from "react-router";

import { resolveErrorMessage } from "@/shared/errors/lib/error-handler";
import { ErrorAlert } from "@/shared/ui/widgets/ErrorAlert";

import {
  useCartItems,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "../../hooks/useCart";

export function CartPage() {
  const { data: cartItems = [], error, refetch } = useCartItems();
  const removeCartItemMutation = useRemoveCartItem();
  const updateQuantityMutation = useUpdateCartItemQuantity();

  const total =
    cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box
          component={Link}
          to="/products"
          sx={{ textDecoration: "none", textAlign: "left" }}
        >
          {"< Continue Shopping"}
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <ShoppingCartIcon /> Shopping Cart
        </Typography>

        {error && (
          <ErrorAlert error={resolveErrorMessage(error)} retry={refetch} />
        )}
        {cartItems?.length === 0 && (
          <Typography>Your cart is empty. Start shopping now!</Typography>
        )}

        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Quantity
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Subtotal
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.productId} hover>
                  <TableCell>
                    <Link to={`/products/${item.productId}`}>{item.name}</Link>
                  </TableCell>
                  <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      inputProps={{ min: 1 }}
                      value={item.quantity}
                      size="small"
                      sx={{ width: 80 }}
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value, 10);
                        if (quantity > 0) {
                          updateQuantityMutation.mutate({
                            productId: item.productId,
                            quantity,
                          });
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() =>
                        removeCartItemMutation.mutate(item.productId)
                      }
                      disabled={removeCartItemMutation.isPending}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Card sx={{ minWidth: 300 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Order Summary
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography>Subtotal:</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography>Shipping:</Typography>
                <Typography>Free</Typography>
              </Box>
              <Box
                sx={{
                  borderTop: 1,
                  pt: 2,
                  display: "flex",
                  justifyContent: "space-between",
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
              <Button variant="contained" fullWidth sx={{ mt: 3 }}>
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
}
