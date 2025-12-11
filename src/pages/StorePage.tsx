import React from 'react';
import type { RootState } from '../store/store';
import { CartIcon } from '../components/CartIcon';
import { CartDrawer } from '../components/CartDrawer';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { ProductCard } from '../components/ProductCard';
import { useAppSelector } from '../store/store';

export const StorePage: React.FC = () => {
  const { filteredProducts } = useAppSelector((state: RootState) => state.products);



  return (
    <>
      <div className="min-h-screen bg-gray-150">
        <header className="bg-gray-150 text-white py-6 shadow-lg relative" style={{background: 'rgba(64, 0, 255, 0.8)', margin: '20px', paddingTop: '10px', paddingRight: '10px', border: '1px solid #000000ff', borderRadius: '8px' }}>
          <div className="flex justify-between items-center px-6">
            <h1 className="text-x font-bold" style={{ paddingBottom: '10px',paddingInline: '20px' }}>Product Store</h1>
            <CartIcon />
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <SearchBar />
          <div className="flex flex-col lg:flex-row gap-6 bg-gray-50 rounded-lg shadow-md" style={{ margin: '20px', padding: '5px' }}>
            {/* Filter Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="mb-4 h-6"></div>
              <FilterPanel />
            </aside>
            <div className="lg:w-20 flex-shrink-0 flex items-center justify-center">
              <div className="h-full w-px bg-gray-300">
                {/* Vertical Divider */}
              </div>
            </div>

            {/* Products Grid */}
            <main className="flex-1 margin-4">
              <div className="mb-4 text-gray-600 p-4">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search query</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <CartDrawer />
    </>
  );
};
