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
import { Button, HeroCarousel } from "../shared/components/ui";
import { ProductModal } from "../features/products/components/ProductModal";
import { useState } from "react";

const HERO_IMAGES = [
  "/src/assets/Tienda1.png",
  "/src/assets/ropa1.jpg",
  "/src/assets/ropa2.jpg",
  "/src/assets/ropa3.jpg",
];

/**
 * 🏠 Home Page - Diseño Premium
 * Página principal con hero section y productos destacados
 */
const Home = () => {
  const dispatch = useAppDispatch();
  const featuredProducts = useAppSelector(selectFeaturedProducts);
  const newProducts = useAppSelector(selectNewProducts);
  const loading = useAppSelector((state) => state.products.loading);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

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
        {/* Fondo para Móvil (Carrusel con overlay suave) */}
        <div className="absolute inset-0 lg:hidden z-0">
          <HeroCarousel
            images={HERO_IMAGES}
            className="w-full h-full"
            imageClassName="opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/90 via-stone-50/70 to-stone-50"></div>
        </div>

        {/* 🎨 Luxury Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-rose-100/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[0%] w-[35%] h-[35%] bg-amber-50/40 rounded-full blur-[100px]"></div>
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
              {/* 🏷️ Boutique Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-rose-100 rounded-full mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">
                  Signature Collection{" "}
                  <span className="text-rose-400 italic font-medium ml-1">
                    2026
                  </span>
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-slate-900 mb-8 leading-[1.05] tracking-tight">
                Elegancia en <br />
                <span className="text-luxury-gradient italic">
                  Cada Detalle
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Descubre una curaduría exclusiva de prendas diseñadas para
                quienes valoran la sofisticación y la calidad atemporal.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link to="/products" className="w-full sm:w-auto">
                  <button className="w-full bg-slate-900 text-white hover:bg-rose-600 px-12 py-5 rounded-full boutique-button-shadow transition-all duration-500 flex items-center justify-center gap-3 group">
                    <span className="text-lg font-bold">Explorar Catálogo</span>
                    <svg
                      className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
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
                  <button className="w-full border border-slate-200 text-slate-900 hover:bg-white hover:border-slate-300 px-12 py-5 rounded-full text-lg font-bold transition-all duration-300 backdrop-blur-sm">
                    Ver Colección
                  </button>
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Carrusel de Imágenes (Sólo Desktop) */}
            <div className="relative hidden lg:block h-[80vh]">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-stone-50/10 to-stone-50 z-10 pointer-events-none"></div>
              <div className="absolute -inset-4 bg-rose-100/30 blur-2xl rounded-[3rem] -z-10"></div>
              <HeroCarousel
                images={HERO_IMAGES}
                className="w-full h-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-[2.5rem] border border-white/40"
              />
              {/* Decoración sutil */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 border-l border-b border-rose-500/20 rounded-bl-[3rem] -z-10"></div>
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
            onViewDetail={handleOpenModal}
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
              onViewDetail={handleOpenModal}
            />
          </div>
        </section>
      )}

      {/* 📍 Sección de Ubicación - Hilda Silva */}
      <section className="bg-slate-900 text-white py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-rose-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Venta Presencial
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                Encuéntranos en el <br />
                <span className="text-rose-100 italic">
                  Corazón del Mercado
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
                Para brindarte una atención personalizada y que puedas apreciar
                la calidad de nuestras telas, te esperamos en nuestro local
                físico. Seleccionamos cada prenda pensando en ti.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-rose-500 transition-colors duration-300 flex-shrink-0 border border-white/5">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-white">
                      Dirección
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      Ubicados dentro del Mercado Principal, Pasillo C, Local
                      12. Ven a visitarnos y descubre tu próximo outfit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-amber-500 transition-colors duration-300 flex-shrink-0 border border-white/5">
                    🛍️
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-white">
                      Modalidad de Venta
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      Venta exclusivamente presencial.{" "}
                      <span className="text-rose-400 font-semibold underline decoration-rose-400/30 underline-offset-4">
                        No realizamos delivery o envíos a domicilio.
                      </span>{" "}
                      ¡Te garantizamos la mejor experiencia en tienda!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-rose-500 to-amber-500 rounded-[2rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-slate-800 rounded-[2rem] overflow-hidden border border-white/10 aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 backdrop-blur-sm">
                  <div className="text-center p-8">
                    <div className="text-5xl mb-6 animate-bounce">🏢</div>
                    <h3 className="text-xl font-bold mb-4">
                      Nuestra Ubicación
                    </h3>
                    <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                      Acércate a nuestro local para probarte tus prendas
                      favoritas y recibir asesoría de imagen.
                    </p>
                    <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all duration-300 shadow-xl shadow-white/5">
                      Ver en Google Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default Home;
