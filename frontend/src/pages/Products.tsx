import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/hooks/useRedux";
import {
  initializeProducts,
  setFilters,
  selectFilteredProducts,
  selectProductsLoading,
  selectFilters,
} from "../features/products/store/productsSlice";
import { ProductGrid } from "../features/products/components/ProductGrid";
import { addToCart } from "../features/cart/store/cartSlice";
import type { Product } from "../features/products/types/types";
import { ProductModal } from "../features/products/components/ProductModal";

/**
 * 🛍️ Products Page
 * Muestra el catálogo de productos con filtrado por género y categorías.
 */
const Products = () => {
  const { gender } = useParams<{ gender: string }>();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectFilteredProducts);
  const loading = useAppSelector(selectProductsLoading);
  const currentFilters = useAppSelector(selectFilters);
  const filter = searchParams.get("filter");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(initializeProducts());
  }, [dispatch]);

  useEffect(() => {
    // Aplicar filtros basados en la URL
    dispatch(
      setFilters({
        ...currentFilters,
        gender: gender as any,
      })
    );
  }, [gender, dispatch]);

  const handleCategoryClick = (category: string) => {
    const isSelected = currentFilters.category === category;
    dispatch(
      setFilters({
        ...currentFilters,
        category: isSelected ? undefined : (category as any),
      })
    );
  };

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0],
      })
    );
    alert(`✅ ${product.name} añadido al carrito!`);
  };

  const getTitle = () => {
    if (gender === "hombre") return "Colección Hombre";
    if (gender === "mujer") return "Colección Mujer";
    if (filter === "new") return "Recién Llegados";
    if (filter === "featured") return "Los Más Populares";
    return "Catálogo Completo";
  };

  const mujerVestuario = [
    "polerones",
    "polos",
    "blusas",
    "shorts",
    "vestidos y faldas",
    "pantalones",
    "jeans",
    "chompas",
    "casacas y chalecos",
    "buzos",
  ];

  const mujerAccesorios = ["medias", "otros"];

  const hombreVestuario = [
    "polos",
    "camisas",
    "shorts",
    "polerones",
    "pantalones",
    "jeans",
    "buzos",
    "casacas y chalecos",
    "chompas",
  ];

  const hombreAccesorios = ["ropa interior", "medias", "otros"];

  // Determinar qué categorías mostrar
  const vestuarioCategories =
    gender === "hombre" ? hombreVestuario : mujerVestuario;
  const accesoriosCategories =
    gender === "hombre" ? hombreAccesorios : mujerAccesorios;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
          <p className="text-slate-400 font-medium">Preparando catálogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header de Categoría - Refinado y Claro */}
      <div className="bg-stone-50 border-b border-stone-100 py-10 md:py-16 mb-12 relative overflow-hidden">
        {/* Decoración de fondo sutil */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl -ml-32 -mb-32"></div>
        </div>

        <div className="container-custom relative z-10">
          <span className="text-rose-500 font-bold tracking-[0.2em] text-[10px] uppercase mb-3 block">
            Exclusividad Hilda Silva
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
            {getTitle()}
          </h1>
          <p className="text-slate-500 max-w-xl text-lg font-light leading-relaxed">
            Una selección curada pensando en la sofisticación y el estilo de la
            mujer actual.
          </p>
        </div>
      </div>

      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar de Filtros Refinado */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-28 p-8 border border-slate-100 rounded-3xl bg-white shadow-sm shadow-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">
                  Filtros
                </h3>
                {currentFilters.category && (
                  <button
                    onClick={() =>
                      dispatch(
                        setFilters({ ...currentFilters, category: undefined })
                      )
                    }
                    className="text-xs text-rose-500 hover:text-rose-600 font-bold border-b border-rose-200"
                  >
                    Resetear
                  </button>
                )}
              </div>

              <div className="space-y-10">
                {/* Vestuario */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-[0.2em]">
                    Vestuario
                  </span>
                  <ul className="space-y-4">
                    {vestuarioCategories.map((cat) => (
                      <li
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`flex items-center gap-3 cursor-pointer transition-all group ${
                          currentFilters.category === cat
                            ? "text-rose-600 font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 border rounded-full transition-all flex items-center justify-center ${
                            currentFilters.category === cat
                              ? "bg-rose-500 border-rose-500 shadow-md shadow-rose-200"
                              : "border-slate-200 bg-slate-50 group-hover:border-rose-300"
                          }`}
                        >
                          {currentFilters.category === cat && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm capitalize tracking-wide">
                          {cat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accesorios */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-[0.2em]">
                    Accesorios
                  </span>
                  <ul className="space-y-4">
                    {accesoriosCategories.map((cat) => (
                      <li
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`flex items-center gap-3 cursor-pointer transition-all group ${
                          currentFilters.category === cat
                            ? "text-rose-600 font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 border rounded-full transition-all flex items-center justify-center ${
                            currentFilters.category === cat
                              ? "bg-rose-500 border-rose-500 shadow-md shadow-rose-200"
                              : "border-slate-200 bg-slate-50 group-hover:border-rose-300"
                          }`}
                        >
                          {currentFilters.category === cat && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm capitalize tracking-wide">
                          {cat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid de Productos */}
          <main className="flex-1">
            {products.length > 0 ? (
              <ProductGrid
                products={products}
                onAddToCart={handleAddToCart}
                onViewDetail={handleOpenModal}
              />
            ) : (
              <div className="text-center py-32 bg-stone-50 rounded-[2rem] border-2 border-dashed border-stone-200">
                <div className="text-4xl mb-4">🍂</div>
                <h4 className="text-xl font-serif font-bold text-slate-900 mb-2">
                  No se encontraron artículos
                </h4>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Intenta ajustando los filtros o vuelve más tarde para ver
                  nuevas colecciones.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 🪟 Product Detail Overlay */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Products;
