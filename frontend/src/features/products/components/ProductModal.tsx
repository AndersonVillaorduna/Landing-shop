import React from "react";
import type { Product } from "../types/types";
import { Badge, Button } from "../../../shared/components/ui";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

/**
 * 🪟 ProductModal Component
 * Ventana emergente con los detalles del producto
 */
export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl animate-zoom-in flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Left: Product Images */}
        <div className="w-full md:w-1/2 bg-stone-50 p-8 flex items-center justify-center">
          <div className="aspect-[3/4] w-full relative group">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-700 group-hover:scale-105"
            />
            {product.isNew && (
              <Badge
                variant="success"
                className="absolute top-4 left-4 shadow-lg scale-110"
              >
                ✨ Nuevo
              </Badge>
            )}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2 p-10 md:p-12 overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <span className="text-rose-500 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
                {product.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-400 line-through font-light">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-slate-500 leading-relaxed font-light text-lg">
                {product.description}
              </p>
            </div>

            {/* Selectores Simplificados */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  Tallas Disponibles
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center text-xs font-bold hover:border-rose-500 cursor-pointer transition-colors"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  Colores
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      title={color}
                      className="w-8 h-8 rounded-full border border-slate-200 hover:scale-110 transition-transform cursor-pointer"
                      style={{
                        backgroundColor:
                          color === "Blanco"
                            ? "#fff"
                            : color === "Negro"
                            ? "#000"
                            : "rgba(0,0,0,0.1)",
                      }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-auto pt-8 border-t border-slate-100 flex gap-4">
              <Button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 bg-slate-900 text-white hover:bg-slate-800 h-16 text-lg rounded-2xl shadow-xl shadow-slate-200"
              >
                🛒 Añadir al Carrito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
