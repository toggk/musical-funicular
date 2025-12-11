import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleCart } from '../store/cartSlice';
import './styles/CartIcon.css';

export const CartIcon: React.FC = () => {
  const dispatch = useAppDispatch();
  const itemCount = useAppSelector((state) => state.cart.itemCount);
  const loading = useAppSelector((state) => state.cart.loading);

  const handleClick = (): void => {
    dispatch(toggleCart());
  };

  return (
    <button
      className="cart-icon-button"
      onClick={handleClick}
      disabled={loading}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <div className="cart-icon-wrapper">
        <svg
          className="cart-icon-svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {itemCount > 0 && (
          <span className="cart-count-bubble">{itemCount}</span>
        )}
      </div>
    </button>
  );
};