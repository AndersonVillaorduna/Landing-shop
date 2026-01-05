import type { Product } from "../types/types";
import { Card } from "../../../shared/components/ui";
import { Badge } from "../../../shared/components/ui";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetail?: (product: Product) => void;
}

/**
 * 🛍️ ProductCard Component
 * Tarjeta de producto con diseño premium y animaciones
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetail,
}) => {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100
      )
    : 0;

  return (
    <div className="group relative">
      <Card hover className="overflow-hidden h-full flex flex-col">
        {/* 🖼️ Imagen del Producto */}
        <Link
          to={`/product/${product.id}`}
          className="relative block overflow-hidden bg-gray-100"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Badges superiores */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="success" className="shadow-lg">
                ✨ Nuevo
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="error" className="shadow-lg">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Overlay con botones */}
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
              className="w-48 bg-white text-slate-900 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-rose-500 hover:text-white"
            >
              🛒 Añadir al Carrito
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onViewDetail?.(product);
              }}
              className="w-48 bg-slate-900/80 backdrop-blur-md text-white py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-slate-900"
            >
              👁️ Ver Detalles
            </button>
          </div>
        </Link>

        {/* 📝 Información del Producto */}
        <div className="p-4 flex-grow flex flex-col">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-rose-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-gray-500 mb-3 line-clamp-1">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-amber-400 fill-current"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Precio  */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice!.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock */}
            {!product.inStock && (
              <p className="text-xs text-red-600 font-medium mt-1">Agotado</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
