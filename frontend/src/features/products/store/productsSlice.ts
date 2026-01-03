import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductsState, ProductFilters } from "../types/types";
import { mockProducts } from "../data/mockProducts";

/**
 * 🛍️ Products Slice - Redux State Management
 * Maneja el estado global de productos, filtros y selección
 */

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  selectedProduct: null,
  filters: {},
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // 📥 Cargar productos
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
      state.loading = false;
    },

    // 🔍 Aplicar filtros
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = action.payload;
      state.filteredItems = filterProducts(state.items, action.payload);
    },

    // 🔎 Búsqueda por texto
    searchProducts: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.filters.search = searchTerm;

      if (!searchTerm) {
        state.filteredItems = filterProducts(state.items, state.filters);
        return;
      }

      state.filteredItems = state.items.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    },

    // 🎯 Seleccionar un producto
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedProduct =
        state.items.find((p) => p.id === action.payload) || null;
    },

    // 🔄 Limpiar selección
    clearSelection: (state) => {
      state.selectedProduct = null;
    },

    // 🧹 Limpiar filtros
    clearFilters: (state) => {
      state.filters = {};
      state.filteredItems = state.items;
    },

    // ⏳ Estados de carga
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // ❌ Manejo de errores
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

/**
 * 🔧 Función auxiliar para filtrar productos
 */
function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((product) => {
    // Filtro por categoría
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Filtro por género
    if (
      filters.gender &&
      product.gender !== filters.gender &&
      product.gender !== "unisex"
    ) {
      return false;
    }

    // Filtro por rango de precio
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    // Filtro por disponibilidad
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
      return false;
    }

    // Filtro por tallas
    if (filters.sizes && filters.sizes.length > 0) {
      const hasSize = filters.sizes.some((size) =>
        product.sizes.includes(size)
      );
      if (!hasSize) return false;
    }

    // Filtro por colores
    if (filters.colors && filters.colors.length > 0) {
      const hasColor = filters.colors.some((color) =>
        product.colors.some((pc) =>
          pc.toLowerCase().includes(color.toLowerCase())
        )
      );
      if (!hasColor) return false;
    }

    return true;
  });
}

// 📤 Export actions
export const {
  setProducts,
  setFilters,
  searchProducts,
  selectProduct,
  clearSelection,
  clearFilters,
  setLoading,
  setError,
} = productsSlice.actions;

// 📥 Export reducer
export default productsSlice.reducer;

// 🎯 Selectores (para acceder al state de forma optimizada)
export const selectAllProducts = (state: { products: ProductsState }) =>
  state.products.items;
export const selectFilteredProducts = (state: { products: ProductsState }) =>
  state.products.filteredItems;
export const selectSelectedProduct = (state: { products: ProductsState }) =>
  state.products.selectedProduct;
export const selectFilters = (state: { products: ProductsState }) =>
  state.products.filters;
export const selectProductsLoading = (state: { products: ProductsState }) =>
  state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) =>
  state.products.error;

// Featured products
export const selectFeaturedProducts = (state: { products: ProductsState }) =>
  state.products.items.filter((p) => p.featured);

// New products
export const selectNewProducts = (state: { products: ProductsState }) =>
  state.products.items.filter((p) => p.isNew);

/**
 * 🚀 Thunk para inicializar productos (simula fetch de API)
 */
export const initializeProducts = () => (dispatch: any) => {
  dispatch(setLoading(true));

  // Simular delay de red
  setTimeout(() => {
    dispatch(setProducts(mockProducts));
  }, 500);
};
