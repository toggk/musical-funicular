import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  CartState,
  AddToCartRequest,
  UpdateCartItemRequest,
  CartResponse,
  CartItemResponse,
} from '../types/cart';

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
  loading: false,
  error: null,
  itemCount: 0,
  subtotal: 0,
};

// Async thunks
export const fetchCart = createAsyncThunk<
  CartResponse,
  void,
  { rejectValue: string }>
  (
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/cart');
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const text = await response.text();
      if (!text || text.trim() === '') {
        // Return empty cart if response is empty
        return { items: [] };
      }

      try {
        const data: CartResponse = JSON.parse(text);
        return data;
      } catch (parseError) {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch cart'
      );
    }
  }
);

export const addToCart = createAsyncThunk<
  CartItemResponse,
  AddToCartRequest,
  { rejectValue: string }
>(
  'cart/addToCart',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add to cart');
      }

      const data: CartItemResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to add to cart'
      );
    }
  }
);

export const updateCartItem = createAsyncThunk<
  CartItemResponse,
  UpdateCartItemRequest,
  { rejectValue: string }
>(
  'cart/updateItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      const data: CartItemResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update item'
      );
    }
  }
);

export const removeFromCart = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'cart/removeItem',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      return itemId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to remove item'
      );
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.subtotal = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.loading = false;
        state.items = action.payload.items || [];
        cartSlice.caseReducers.calculateTotals(state);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch cart';
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItemResponse>) => {
        state.loading = false;
        const newItem = action.payload;
        const existingItem = state.items.find(
          (item) => item.id === newItem.id
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push(newItem);
        }

        cartSlice.caseReducers.calculateTotals(state);
        // state.isOpen = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add to cart';
      })

      // Update item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItemResponse>) => {
        state.loading = false;
        const updatedItem = action.payload;
        const index = state.items.findIndex(
          (item) => item.id === updatedItem.id
        );

        if (index !== -1) {
          state.items[index] = updatedItem;
        }

        cartSlice.caseReducers.calculateTotals(state);
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update item';
      })

      // Remove item
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
        cartSlice.caseReducers.calculateTotals(state);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove item';
      });
  },
});

export const { toggleCart, openCart, closeCart, clearError, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;