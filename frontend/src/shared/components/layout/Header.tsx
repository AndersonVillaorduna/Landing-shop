import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  selectCartItemsCount,
  toggleDrawer,
} from "../../../features/cart/store/cartSlice";
import { useState } from "react";

/**
 * 🎯 Header Component
 * Navbar responsive con logo, menú y carrito
 */
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector(selectCartItemsCount);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* 🏷️ Logo de Imagen - Hilda Silva */}
          <Link to="/" className="flex items-center group">
            <img
              src="/src/assets/Logo.jpg"
              alt="Hilda Silva Logo"
              className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
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
              to="/products/ninos"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Niños
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
            {/* Carrito de Compras - Botón Funcional */}
            <button
              onClick={() => dispatch(toggleDrawer())}
              className="relative p-2 text-slate-500 hover:text-rose-500 transition-colors group"
              aria-label="Abrir carrito"
            >
              <svg
                className="w-6 h-6 transition-transform group-hover:scale-110"
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
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm animate-zoom-in">
                  {cartItemsCount}
                </span>
              )}
            </button>

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
                to="/products/ninos"
                className="text-slate-600 hover:text-rose-600 font-medium py-3 px-4 transition-colors flex items-center justify-between rounded-xl hover:bg-rose-50/50"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Niños</span>
                <span className="text-[10px] text-slate-400 tracking-widest font-bold">
                  KIDS
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
