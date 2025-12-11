import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSortBy } from '../store/productsSlice';
import type { RootState } from '../store/store';
import './styles/SearchBar.css';
export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { searchQuery, sortBy } = useSelector((state: RootState) => state.products);

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <div className="search-input-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="search-input"
            />
            <svg
              className="search-icon"
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
        <div className="sort-select-container">
          <select
            value={sortBy}
            onChange={(e) =>
              dispatch(
                setSortBy(
                  e.target.value as 'name' | 'price-asc' | 'price-desc' | 'rating'
                )
              )
            }
            className="sort-select"
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
