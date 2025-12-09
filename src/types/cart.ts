export interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  quantity: number;
  inStock: boolean;
}

export interface Cart {
    items: CartItem[];
    tax: number;
    totalAmount: number;
}
