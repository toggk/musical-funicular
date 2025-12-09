import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSortBy } from '../store/productsSlice';
import type { RootState } from '../store/store';
import '../components/styles/searchbar.css';
export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { searchQuery, sortBy } = useSelector((state: RootState) => state.products);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6" style={{ margin: '20px', padding: '10px' }}>
      <div className="flex flex-col md:flex-row md:items-center" style={{ gap: '10px' }}>
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
            />
            <svg
              className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
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
          </div>
        </div>
        <div className="md:w-48 top-4 md:top-0 md:ml-4 mt-4 md:mt-0" style={{ marginLeft: '10px' }}>
          <select
            value={sortBy}
            onChange={(e) =>
              dispatch(
                setSortBy(
                  e.target.value as 'name' | 'price-asc' | 'price-desc' | 'rating'
                )
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 ;"
          >
            <option value="name">Sort by Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
};
