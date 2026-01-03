import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/hooks/useRedux";
import {
  initializeProducts,
  selectFeaturedProducts,
  selectNewProducts,
} from "../features/products/store/productsSlice";
import { ProductGrid } from "../features/products/components/ProductGrid";
import { addToCart } from "../features/cart/store/cartSlice";
import type { Product } from "../features/products/types/types";
import { Button } from "../shared/components/ui";

/**
 * 🏠 Home Page - Diseño Premium
 * Página principal con hero section y productos destacados
 */
const Home = () => {
  const dispatch = useAppDispatch();
  const featuredProducts = useAppSelector(selectFeaturedProducts);
  const newProducts = useAppSelector(selectNewProducts);
  const loading = useAppSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(initializeProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    // Por ahora añadimos con talla y color por defecto
    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0],
      })
    );

    // TODO: Mostrar notificación
    alert(`✅ ${product.name} añadido al carrito!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 🎯 Hero Section - Diseño Sofisticado, Claro y Femenino */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-stone-50">
        {/* Fondo para Móvil (Imagen de tienda con overlay suave) */}
        <div className="absolute inset-0 lg:hidden z-0">
          <img
            src="/src/assets/Tienda1.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-stone-50/60 to-stone-50"></div>
        </div>

        {/* Fondo Detallado para Desktop */}
        <div className="hidden lg:block absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-stone-100 opacity-95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(244,63,94,0.05),transparent_50%)]"></div>
          <div
            className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Columna Izquierda: Mensaje Principal */}
            <div className="text-center lg:text-left py-16 lg:py-0">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-slate-900 mb-8 leading-tight tracking-tight">
                Elegancia en <br />
                <span className="font-bold bg-gradient-to-r from-rose-500 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                  Cada Detalle
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Descubre una curaduría exclusiva de prendas diseñadas para
                quienes valoran la sofisticación y la calidad atemporal.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link to="/products" className="w-full sm:w-auto">
                  <button className="w-full bg-slate-900 text-white hover:bg-slate-800 px-10 py-5 text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-slate-200">
                    <span>Explorar Catálogo</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </Link>
                <Link to="/products?filter=new" className="w-full sm:w-auto">
                  <button className="w-full border border-slate-200 text-slate-800 hover:bg-white px-10 py-5 text-lg font-semibold transition-all duration-300">
                    Ver Colección
                  </button>
                </Link>
              </div>

              {/* Stats Refinados */}
              <div className="flex justify-center lg:justify-start gap-8 md:gap-12 mt-20 border-t border-slate-200 pt-8">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-slate-900">
                    500+
                  </div>
                  <div className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest mt-1 font-bold">
                    Modelos
                  </div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-slate-900">
                    10K+
                  </div>
                  <div className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest mt-1 font-bold">
                    Clientes
                  </div>
                </div>
                <div className="hidden xs:block">
                  <div className="text-xl md:text-2xl font-bold text-slate-900">
                    4.9★
                  </div>
                  <div className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest mt-1 font-bold">
                    Excelencia
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Imagen a Color (Sólo Desktop) */}
            <div className="relative hidden lg:block h-[75vh]">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-stone-50/5 to-stone-50 z-10"></div>
              <img
                src="/src/assets/Tienda1.png"
                alt="Boutique Hilda Silva"
                className="w-full h-full object-cover transition-all duration-700 shadow-2xl border-l border-white/40"
              />
              {/* Decoración sutil */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-rose-500/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 Productos Nuevos */}
      {newProducts.length > 0 && (
        <section className="container-custom py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-rose-500 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
                Temporada 2026
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                ✨ Recién Llegados
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl">
                Las últimas novedades seleccionadas para elevar tu estilo
                diario.
              </p>
            </div>
            <Link to="/products?filter=new">
              <Button
                variant="ghost"
                className="text-slate-900 font-bold hover:text-rose-600 transition-colors border-b border-slate-900 rounded-none px-0 py-1 hover:bg-transparent"
              >
                Ver catálogo completo
              </Button>
            </Link>
          </div>

          <ProductGrid
            products={newProducts.slice(0, 4)}
            onAddToCart={handleAddToCart}
          />
        </section>
      )}

      {/* 🌟 Productos Destacados */}
      {featuredProducts.length > 0 && (
        <section className="bg-stone-50 py-24">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-rose-500 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
                  Best Sellers
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                  🔥 Más Populares
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl">
                  Las piezas favoritas de nuestras clientas, diseñadas para
                  destacar.
                </p>
              </div>
              <Link to="/products?filter=featured">
                <Button
                  variant="ghost"
                  className="text-slate-900 font-bold hover:text-rose-600 transition-colors border-b border-slate-900 rounded-none px-0 py-1 hover:bg-transparent"
                >
                  Explorar favoritos
                </Button>
              </Link>
            </div>

            <ProductGrid
              products={featuredProducts.slice(0, 8)}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>
      )}

      {/* 💎 Banner de Beneficios */}
      <section className="container-custom py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="group">
            <div className="w-16 h-16 bg-stone-50 flex items-center justify-center text-3xl mb-6 group-hover:bg-rose-50 transition-colors duration-300">
              🚚
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Envío Premium
            </h3>
            <p className="text-slate-500 leading-relaxed">
              Disfruta de envío gratuito en pedidos superiores a $50 con empaque
              exclusivo.
            </p>
          </div>

          <div className="group">
            <div className="w-16 h-16 bg-stone-50 flex items-center justify-center text-3xl mb-6 group-hover:bg-rose-50 transition-colors duration-300">
              🔄
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Garantía de Satisfacción
            </h3>
            <p className="text-slate-500 leading-relaxed">
              Tienes 30 días para realizar cambios o devoluciones de forma
              sencilla y rápida.
            </p>
          </div>

          <div className="group">
            <div className="w-16 h-16 bg-stone-50 flex items-center justify-center text-3xl mb-6 group-hover:bg-rose-50 transition-colors duration-300">
              💎
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Atención Personalizada
            </h3>
            <p className="text-slate-500 leading-relaxed">
              Nuestro equipo de estilistas está disponible para asesorarte en
              cada compra.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
