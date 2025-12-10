import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { updateCartItem, removeFromCart } from '../store/cartSlice';
import type { CartItem as CartItemType } from '../types/cart';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.cart.loading);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleQuantityChange = async (newQuantity: number): Promise<void> => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    try {
      await dispatch(
        updateCartItem({
          itemId: item.id,
          quantity: newQuantity,
        })
      ).unwrap();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async (): Promise<void> => {
    if (window.confirm('Remove this item from cart?')) {
      setIsUpdating(true);
      try {
        await dispatch(removeFromCart(item.id)).unwrap();
      } catch (error) {
        console.error('Failed to remove item:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      handleQuantityChange(value);
    }
  };

  const itemTotal: string = (item.price * item.quantity).toFixed(2);

  return (
    <div className={`cart-item ${isUpdating ? 'updating' : ''}`}>
      <div className="item-image">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
      </div>

      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-price">${item.price.toFixed(2)}</p>

        <div className="quantity-controls">
          <button
            className="qty-button"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={loading || isUpdating || item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>

          <input
            type="number"
            className="qty-input"
            value={item.quantity}
            onChange={handleInputChange}
            disabled={loading || isUpdating}
            min="1"
            aria-label="Quantity"
          />

          <button
            className="qty-button"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={loading || isUpdating}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="item-footer">
          <span className="item-total">Total: ${itemTotal}</span>
          <button
            className="remove-button"
            onClick={handleRemove}
            disabled={loading || isUpdating}
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;