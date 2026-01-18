import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton } from "@mui/material";
import { useNavigate } from "react-router";

import { useCartItemCount } from "../../hooks/useCart";

export function CartIcon() {
  const itemCount = useCartItemCount();
  const navigate = useNavigate();

  return (
    <IconButton color="inherit" onClick={() => navigate("/cart")}>
      <Badge badgeContent={itemCount} color="error" invisible={itemCount === 0}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
