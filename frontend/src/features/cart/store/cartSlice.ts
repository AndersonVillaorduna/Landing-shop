import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartState, CartItem } from "../types/types";
import type { Product } from "../../products/types/types";

/**
 * 🛒 Cart Slice - Redux State Management
 * Maneja el carrito de compras con persistencia en localStorage
 */

const initialState: CartState = {
  items: [],
  total: 0,
  itemsCount: 0,
  isDrawerOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ Añadir producto al carrito
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        selectedSize: string;
        selectedColor: string;
      }>
    ) => {
      const { product, quantity, selectedSize, selectedColor } = action.payload;

      // Verificar si el producto ya existe con la misma talla y color
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItemIndex >= 0) {
        // Si existe, incrementar cantidad
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Si no existe, añadir nuevo item
        state.items.push({
          product,
          quantity,
          selectedSize,
          selectedColor,
        });
      }

      // Recalcular totales
      recalculateTotals(state);
    },

    // ➖ Remover producto del carrito
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
      recalculateTotals(state);
    },

    // 🔢 Actualizar cantidad
    updateQuantity: (
      state,
      action: PayloadAction<{ index: number; quantity: number }>
    ) => {
      const { index, quantity } = action.payload;

      if (quantity <= 0) {
        state.items.splice(index, 1);
      } else {
        state.items[index].quantity = quantity;
      }

      recalculateTotals(state);
    },

    // 🗑️ Limpiar carrito
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemsCount = 0;
    },

    // 💾 Cargar desde localStorage
    loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      recalculateTotals(state);
    },

    // 🪟 Control del Drawer
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});

/**
 * 🔧 Función auxiliar para recalcular totales
 */
function recalculateTotals(state: CartState) {
  state.itemsCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Guardar en localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }
}

// 📤 Export actions
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadCartFromStorage,
  toggleDrawer,
  closeDrawer,
} = cartSlice.actions;

// 📥 Export reducer
export default cartSlice.reducer;

// 🎯 Selectores
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;
export const selectCartItemsCount = (state: { cart: CartState }) =>
  state.cart.itemsCount;
export const selectIsCartDrawerOpen = (state: { cart: CartState }) =>
  state.cart.isDrawerOpen;
