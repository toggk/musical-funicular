import React from 'react';
import type { Product } from '../types/product';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addToCart } from '../store/cartSlice';
import { useState } from 'react';
import './styles/ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.cart.loading);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleAddToCart = async (): Promise<void> => {
    setIsAdding(true);
    try {
      await dispatch(
        addToCart({
          productId: product.id,
          quantity: 1,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      ).unwrap();

      // Show success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const getButtonText = (): string => {
    if (isAdding) return 'Adding...';
    if (showSuccess) return '✓ Added!';
    return 'Add to Cart';
  };
  return (
    <div className="bg-gray-150 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-orange-500 transition-shadow duration-300" style={{ margin: '10px', padding: '10px', border: '2px solid #000000ff' }}>
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
        <div className="text-xs text-gray-150 mb-1">{product.brand}</div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-black mb-3 line-clamp-2 py-4" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white-600 px-2 py-1 rounded">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm text-gray-700">{product.rating}</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-150 bg-blue rounded px-2 py-1 absolute bottom-0">
          {product.category}
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          disabled={loading || isAdding || !product.inStock}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

