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
      {/* 🎯 Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom right, rgb(79 70 229), rgb(67 56 202), rgb(219 39 119))",
        }}
      >
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="py-24 md:py-32 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Descubre tu Estilo
              <span className="block text-3xl md:text-5xl mt-4 bg-gradient-to-r from-amber-200 to-pink-200 bg-clip-text text-transparent">
                Moda que te Define
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              Las últimas tendencias en ropa y accesorios con envío gratis en
              compras mayores a $50
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/products">
                <button className="bg-white text-primary-700 hover:bg-pink-50 px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 transition-all duration-300 flex items-center gap-3 border-4 border-pink-200">
                  <span className="text-3xl">🛍️</span>
                  <span>Explorar Catálogo</span>
                </button>
              </Link>
              <button className="border-4 border-white text-white hover:bg-white hover:text-pink-600 px-12 py-6 text-xl font-bold rounded-full backdrop-blur-sm bg-white/20 transform hover:scale-110 transition-all duration-300 flex items-center gap-3 shadow-xl">
                <span className="text-3xl">✨</span>
                <span>Ver Ofertas</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-white/80 text-sm">Productos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/80 text-sm">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">4.9★</div>
                <div className="text-white/80 text-sm">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* 🔥 Productos Nuevos */}
      {newProducts.length > 0 && (
        <section className="container-custom py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                ✨ Recién Llegados
              </h2>
              <p className="text-gray-600">
                Las últimas novedades para tu armario
              </p>
            </div>
            <Link to="/products?filter=new">
              <Button variant="ghost" className="text-primary-600">
                Ver todos →
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
        <section className="bg-gray-50 py-16">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  🔥 Más Populares
                </h2>
                <p className="text-gray-600">
                  Los favoritos de nuestros clientes
                </p>
              </div>
              <Link to="/products?filter=featured">
                <Button variant="ghost" className="text-primary-600">
                  Ver todos →
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
      <section className="container-custom py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Envío Gratis
            </h3>
            <p className="text-gray-600">En compras mayores a $50</p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-secondary-50 to-secondary-100 border border-secondary-200">
            <div className="text-5xl mb-4">🔄</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Devoluciones Fáciles
            </h3>
            <p className="text-gray-600">30 días para devolver</p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200">
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Pago Seguro
            </h3>
            <p className="text-gray-600">Tus datos protegidos</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
