import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { type Product } from "@/shared/api/model";

interface ProductCardProps {
  product: Product;
  onClick?: (id: string) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
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
    </Card>
  );
};
