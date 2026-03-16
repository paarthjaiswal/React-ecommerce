import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Features/ProductList/productListSlice';
import authSlice from '../Features/Auth/authSlice';
import cartSlice from '../Features/Cart/cartSlice';
import orderSlice from '../Features/order/orderSlice';

 export  const store = configureStore({
  reducer: {
    user: authSlice,
    productlist: productReducer,
    cart : cartSlice,
    order : orderSlice
  },
});