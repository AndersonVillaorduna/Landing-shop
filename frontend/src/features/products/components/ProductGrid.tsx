import type { Product } from "../types/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onViewDetail?: (product: Product) => void;
}

/**
 * 📦 ProductGrid Component
 * Grid responsive de productos
 */
export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onViewDetail,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};
