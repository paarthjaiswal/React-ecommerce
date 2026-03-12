import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Features/ProductList/productListSlice';
import authSlice from '../Features/Auth/authSlice';


 export  const store = configureStore({
  reducer: {
    user: authSlice,
    productlist: productReducer,
  },
});