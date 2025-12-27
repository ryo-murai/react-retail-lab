import { useListProducts } from "@/shared/api/products/products";
import { ProductCard } from "../widgets/ProductCard";

export const ProductsListPage = () => {
  const { data: productsResp } = useListProducts();

  if (!productsResp) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {productsResp?.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
