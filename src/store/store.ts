import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;