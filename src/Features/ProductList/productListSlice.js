import { fetchalldata } from "./productApi";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Define the Async Thunk to fetch products from your local server
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const data = await fetchalldata()
    console.log("thunk runs");
    return data  // This becomes the 'payload'
  
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; // Setting the list from JSON server
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
export const selectallproducts = (state) => state.productlist.products;

export default productSlice.reducer;