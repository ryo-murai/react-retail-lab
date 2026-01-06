import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { type Product } from "@/shared/api/model";

interface ProductCardProps {
  product: Product;
  onClick?: (id: string) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onClick,
  onAddToCart,
}: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <Card
      onClick={() => onClick?.(product.productId)}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {product.imageUrl && (
        <CardMedia
          component="img"
          height="250"
          image={product.imageUrl}
          alt={product.name}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        {product.category && (
          <Box sx={{ mb: 1 }}>
            <Chip label={product.category} size="small" />
          </Box>
        )}
        {product.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
        )}
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};
