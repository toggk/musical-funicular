import React from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-4 relative min-h-[150px]">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 py-4" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white-600 px-2 py-1 rounded">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm text-gray-700">{product.rating}</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500 bg-blue-200 rounded px-2 py-1 absolute bottom-0">
          {product.category}
        </div>
      </div>
    </div>
  );
};
