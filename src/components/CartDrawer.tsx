import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { closeCart, fetchCart } from '../store/cartSlice';
import CartItem from './CartItem';

export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, items, loading, error, subtotal } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCart());
    }
  }, [isOpen, dispatch]);

  const handleCheckout = (): void => {
    console.log('Proceeding to checkout');
    window.location.href = '/checkout';
  };

  const handleClose = (): void => {
    dispatch(closeCart());
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={handleClose} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button
            className="close-button"
            onClick={handleClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="cart-content">
          {loading && items.length === 0 ? (
            <div className="cart-loading">Loading cart...</div>
          ) : error ? (
            <div className="cart-error">{error}</div>
          ) : items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <button className="continue-shopping" onClick={handleClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-subtotal">
                  <span>Subtotal:</span>
                  <span className="subtotal-amount">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <button
                  className="checkout-button"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  Proceed to Checkout
                </button>

                <button
                  className="continue-shopping-link"
                  onClick={handleClose}
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};