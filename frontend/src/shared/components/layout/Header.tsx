import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { selectCartItemsCount } from "../../../features/cart/store/cartSlice";

/**
 * 🎯 Header Component
 * Navbar responsive con logo, menú y carrito
 */
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Obtener cantidad de items del carrito desde Redux
  const cartItemsCount = useAppSelector(selectCartItemsCount);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-lg">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* 🏷️ Logo Elegante - Hilda Silva */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo SVG - Diseño limpio con gradiente rojo-rosa */}
            <div className="relative w-14 h-14">
              <svg
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  {/* Gradiente Rojo a Rosa */}
                  <linearGradient
                    id="logoGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#dc2626", stopOpacity: 1 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: "#f43f5e", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#fda4af", stopOpacity: 1 }}
                    />
                  </linearGradient>

                  {/* Sombra suave */}
                  <filter id="shadow">
                    <feDropShadow
                      dx="0"
                      dy="2"
                      stdDeviation="3"
                      floodOpacity="0.3"
                    />
                  </filter>
                </defs>

                {/* Círculo de fondo con gradiente */}
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  fill="url(#logoGradient)"
                  className="group-hover:scale-105 transition-all duration-300"
                  style={{ transformOrigin: "center" }}
                  filter="url(#shadow)"
                />

                {/* Círculo interior blanco */}
                <circle cx="28" cy="28" r="22" fill="white" />

                {/* Corona decorativa superior */}
                <g transform="translate(28, 14)">
                  {/* Puntas de la corona */}
                  <path
                    d="M -4 0 L -2 -3 L 0 0 L 2 -3 L 4 0"
                    stroke="url(#logoGradient)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Base de la corona */}
                  <line
                    x1="-5"
                    y1="0"
                    x2="5"
                    y2="0"
                    stroke="url(#logoGradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>

                {/* Letra H elegante */}
                <g>
                  <path
                    d="M 16 22 L 16 38"
                    stroke="url(#logoGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 22 22 L 22 38"
                    stroke="url(#logoGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 16 30 L 22 30"
                    stroke="url(#logoGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>

                {/* Letra S elegante */}
                <g>
                  <path
                    d="M 38 24 C 38 22, 36 20, 32 20 C 28 20, 28 22, 28 24 C 28 26, 30 28, 34 28 C 38 28, 40 30, 40 32 C 40 34, 38 36, 34 36 C 30 36, 28 34, 28 32"
                    stroke="url(#logoGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                {/* Detalles decorativos - corazones pequeños */}
                <circle
                  cx="12"
                  cy="40"
                  r="1.5"
                  fill="url(#logoGradient)"
                  opacity="0.6"
                />
                <circle
                  cx="44"
                  cy="40"
                  r="1.5"
                  fill="url(#logoGradient)"
                  opacity="0.6"
                />
              </svg>
            </div>

            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 via-rose-500 to-pink-400 bg-clip-text text-transparent block leading-none tracking-tight">
                Hilda Silva
              </span>
              <span className="text-xs text-gray-400 tracking-widest font-light">
                BOUTIQUE
              </span>
            </div>
          </Link>

          {/* 📱 Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white font-medium transition-colors relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/products"
              className="text-gray-300 hover:text-white font-medium transition-colors relative group"
            >
              Productos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/categories"
              className="text-gray-300 hover:text-white font-medium transition-colors relative group"
            >
              Categorías
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white font-medium transition-colors relative group"
            >
              Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* 🛒 Cart & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 📱 Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/products"
                className="text-gray-300 hover:text-white font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link
                to="/categories"
                className="text-gray-300 hover:text-white font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categorías
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
