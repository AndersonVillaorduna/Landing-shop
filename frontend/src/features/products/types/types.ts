// 👕 Product Types & Interfaces

export type Category =
  | "camisetas"
  | "pantalones"
  | "zapatos"
  | "accesorios"
  | "vestidos"
  | "abrigos";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Gender = "hombre" | "mujer" | "unisex";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Para productos en oferta
  images: string[]; // URLs de imágenes
  category: Category;
  gender: Gender;
  sizes: Size[];
  colors: string[];
  inStock: boolean;
  featured: boolean; // Producto destacado
  isNew: boolean; // Producto nuevo
  rating: number; // 0-5
  reviewsCount: number;
  tags: string[]; // Ej: "oferta", "popular", "eco-friendly"
}

export interface ProductFilters {
  category?: Category;
  gender?: Gender;
  priceRange?: [number, number];
  sizes?: Size[];
  colors?: string[];
  inStock?: boolean;
  search?: string;
}

export interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  loading: boolean;
  error: string | null;
}
