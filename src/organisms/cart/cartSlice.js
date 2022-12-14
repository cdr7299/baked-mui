import { createSlice } from '@reduxjs/toolkit';
import _get from 'lodash/get';
import _set from 'lodash/set';

const initialState = {
  selectedProducts: {}
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { name, cost } = action.payload;
      _set(state, ['selectedProducts', name, 'cost'], cost); // todo use constants
      _set(state, ['selectedProducts', name, 'name'], name);
      const currentProductCount = _get(state, ['selectedProducts', name, 'currentCount'], 0);
      _set(state, ['selectedProducts', name, 'currentCount'], currentProductCount + 1);
    },
    deleteFromCart: (state, action) => {
      const { name } = action.payload;
      const currentProductCount = _get(state, ['selectedProducts', name, 'currentCount'], 0);
      if (currentProductCount > 1) {
        _set(state, ['selectedProducts', name, 'currentCount'], currentProductCount - 1);
      } else {
        _set(state, ['selectedProducts', name], {});
      }
    },
    clearCart: (state) => {
      _set(state, ['selectedProducts'], {});
    }
  }
});

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.selectedProducts;
export const selectProductCountByName = (productName) => (state) => {
  return _get(state, ['selectedProducts', productName, 'currentCount'], 0);
};

export default cartSlice.reducer;
