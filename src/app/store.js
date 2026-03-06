import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Features/ProductList/productListSlice';

 export  const store = configureStore({
  reducer: {
    productlist: productReducer,
  },
});