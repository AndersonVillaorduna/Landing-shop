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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
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
                  <filter id="shadow">
                    <feDropShadow
                      dx="0"
                      dy="2"
                      stdDeviation="2"
                      floodOpacity="0.1"
                    />
                  </filter>
                </defs>
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  fill="url(#logoGradient)"
                  className="group-hover:scale-105 transition-all duration-300"
                  style={{ transformOrigin: "center" }}
                  filter="url(#shadow)"
                />
                <circle cx="28" cy="28" r="22" fill="white" />
                <g transform="translate(28, 14)">
                  <path
                    d="M -4 0 L -2 -3 L 0 0 L 2 -3 L 4 0"
                    stroke="url(#logoGradient)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
                <g>
                  <path
                    d="M 38 24 C 38 22, 36 20, 32 20 C 28 20, 28 22, 28 24 C 28 26, 30 28, 34 28 C 38 28, 40 30, 40 32 C 40 34, 38 36, 34 36 C 30 36, 28 34, 28 32"
                    stroke="url(#logoGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              </svg>
            </div>

            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 via-rose-500 to-pink-400 bg-clip-text text-transparent block leading-none tracking-tight">
                Hilda Silva
              </span>
              <span className="text-[10px] text-slate-400 tracking-[0.3em] font-medium uppercase mt-1 block">
                BOUTIQUE
              </span>
            </div>
          </Link>

          {/* 📱 Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Inicio
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/products/hombre"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Hombre
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/products/mujer"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Mujer
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/products"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Catálogo
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* 🛒 Cart & Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon */}
            <button className="p-2 text-slate-500 hover:text-rose-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-500 hover:text-rose-500 transition-colors"
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
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-500 hover:text-rose-500 transition-colors"
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
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 📱 Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-stone-100 animate-slide-up bg-white">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-slate-600 hover:text-rose-600 font-medium py-3 px-4 transition-colors flex items-center justify-between rounded-xl hover:bg-rose-50/50"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Inicio</span>
                <span className="text-[10px] text-slate-400 tracking-widest font-bold">
                  HOME
                </span>
              </Link>
              <Link
                to="/products/hombre"
                className="text-slate-600 hover:text-rose-600 font-medium py-3 px-4 transition-colors flex items-center justify-between rounded-xl hover:bg-rose-50/50"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Hombre</span>
                <span className="text-[10px] text-slate-400 tracking-widest font-bold">
                  MEN
                </span>
              </Link>
              <Link
                to="/products/mujer"
                className="text-slate-600 hover:text-rose-600 font-medium py-3 px-4 transition-colors flex items-center justify-between rounded-xl hover:bg-rose-50/50"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Mujer</span>
                <span className="text-[10px] text-slate-400 tracking-widest font-bold">
                  WOMEN
                </span>
              </Link>
              <Link
                to="/products"
                className="text-slate-600 hover:text-rose-600 font-medium py-3 px-4 transition-colors flex items-center justify-between rounded-xl hover:bg-rose-50/50"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Catálogo Completo</span>
                <span className="text-[10px] text-slate-400 tracking-widest font-bold">
                  SHOP
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
