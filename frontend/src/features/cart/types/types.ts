// 📦 Cart Types & Interfaces

import type { Product } from "../../products/types/types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemsCount: number;
  isDrawerOpen: boolean;
}
