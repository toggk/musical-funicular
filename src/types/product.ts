export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  image: string;
  description: string;
  inStock: boolean;
}

export interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  filters: FilterOptions;
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'rating';
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  inStockOnly: boolean;
}
