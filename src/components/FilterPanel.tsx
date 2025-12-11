import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleCategory,
  toggleBrand,
  setPriceRange,
  toggleInStockOnly,
  clearFilters,
} from '../store/productsSlice';
import type { RootState } from '../store/store';
import './styles/FilterPanel.css';


export const FilterPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { filters, allProducts } = useSelector((state: RootState) => state.products);

  const categories = Array.from(new Set(allProducts.map((p) => p.category)));
  const brands = Array.from(new Set(allProducts.map((p) => p.brand)));

  return (
    <div className="bg-gray-150 p-4 rounded-lg shadow-md h-150 overflow-y-auto" style={{ margin: '10px', padding: '10px', border: 'px solid #000000ff' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={() => dispatch(clearFilters())}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => dispatch(toggleCategory(category))}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => dispatch(toggleBrand(brand))}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600">Min: ${filters.priceRange.min}</label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.priceRange.min}
              onChange={(e) =>
                dispatch(
                  setPriceRange({
                    min: Number(e.target.value),
                    max: filters.priceRange.max,
                  })
                )
              }
              className="w-full h-2 bg-gray-200 accent-green-500 rounded-lg appearance-none cursor-pointer "
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Max: ${filters.priceRange.max}</label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.priceRange.max}
              onChange={(e) =>
                dispatch(
                  setPriceRange({
                    min: filters.priceRange.min,
                    max: Number(e.target.value),
                  })
                )
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* In Stock */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => dispatch(toggleInStockOnly())}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm">In Stock Only</span>
        </label>
      </div>
    </div>
  );
};
