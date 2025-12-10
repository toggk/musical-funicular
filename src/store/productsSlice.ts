import type  {PayloadAction}  from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Product, FilterOptions } from '../types/product';
import { sampleProducts } from '../data/products';
import type { ProductsState } from '../types/product';


const initialFilters: FilterOptions = {
  categories: [],
  brands: [],
  priceRange: {
    min: 0,
    max: 1000,
  },
  inStockOnly: false,
};

const initialState: ProductsState = {
  allProducts: sampleProducts,
  filteredProducts: sampleProducts,
  searchQuery: '',
  filters: initialFilters,
  sortBy: 'name',
};

const applyFiltersAndSearch = (state: ProductsState) => {
  let filtered = state.allProducts;

  // Apply search
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (state.filters.categories.length > 0) {
    filtered = filtered.filter((product) =>
      state.filters.categories.includes(product.category)
    );
  }

  // Apply brand filter
  if (state.filters.brands.length > 0) {
    filtered = filtered.filter((product) =>
      state.filters.brands.includes(product.brand)
    );
  }

  // Apply price range filter
  filtered = filtered.filter(
    (product) =>
      product.price >= state.filters.priceRange.min &&
      product.price <= state.filters.priceRange.max
  );

  // Apply in-stock filter
  if (state.filters.inStockOnly) {
    filtered = filtered.filter((product) => product.inStock);
  }

  // Apply sorting
  switch (state.sortBy) {
    case 'name':
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price-asc':
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
      break;
  }

  state.filteredProducts = filtered;
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      applyFiltersAndSearch(state);
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.filters.categories.includes(category)) {
        state.filters.categories = state.filters.categories.filter(
          (c) => c !== category
        );
      } else {
        state.filters.categories.push(category);
      }
      applyFiltersAndSearch(state);
    },
    toggleBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload;
      if (state.filters.brands.includes(brand)) {
        state.filters.brands = state.filters.brands.filter((b) => b !== brand);
      } else {
        state.filters.brands.push(brand);
      }
      applyFiltersAndSearch(state);
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.filters.priceRange = action.payload;
      applyFiltersAndSearch(state);
    },
    toggleInStockOnly: (state) => {
      state.filters.inStockOnly = !state.filters.inStockOnly;
      applyFiltersAndSearch(state);
    },
    setSortBy: (
      state,
      action: PayloadAction<'name' | 'price-asc' | 'price-desc' | 'rating'>
    ) => {
      state.sortBy = action.payload;
      applyFiltersAndSearch(state);
    },
    clearFilters: (state) => {
      state.filters = initialFilters;
      state.searchQuery = '';
      applyFiltersAndSearch(state);
    },
  },
});

export const {
  setSearchQuery,
  toggleCategory,
  toggleBrand,
  setPriceRange,
  toggleInStockOnly,
  setSortBy,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
