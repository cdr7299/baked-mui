import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../organisms/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});
