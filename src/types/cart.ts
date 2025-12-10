
export interface Cart {
    items: CartItem[];
    tax: number;
    totalAmount: number;
}

// Cart item types
export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Cart state types
export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  error: string | null;
  itemCount: number;
  subtotal: number;
}

// API request types
export interface AddToCartRequest {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image?: string;
}

export interface UpdateCartItemRequest {
  itemId: number;
  quantity: number;
}

// API response types
export interface CartResponse {
  items: CartItem[];
}

export interface CartItemResponse extends CartItem {}

// Redux action payload types
export type RemoveFromCartPayload = number; // itemId