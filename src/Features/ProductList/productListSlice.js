import { fetchalldata, fetchbyfilter , fetchbrands , fetchcatagories,fetchproductbyid} from "./productApi";
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
export const fetchProductbyfilter = createAsyncThunk(
  'products/fetchProductbyfilter',
 async (filterObject) => {
    // 1. Initialize the built-in URL search parser
   const params = new URLSearchParams();

    for (let key in filterObject) {
      // Branch 1: Is the value an Array? (e.g., brand: ["Apple", "Samsung"])
      if (Array.isArray(filterObject[key])) {
        for (let value of filterObject[key]) {
          params.append(key, value); 
        }
      } 
      // Branch 2: Is the value a String? (e.g., _sort: "price")
      else {
        params.append(key, filterObject[key]); 
      }
    }

    
    const queryString = `http://localhost:3000/products?${params.toString()}`;
    console.log("Final API URL:", queryString); 

    const response = await fetch(queryString);
    const data = await response.json();
    return data;
  })


  export const fetchallbrands = createAsyncThunk(
    'products/brands',
        async () =>{
          const data = await fetchbrands()
          return data
        }
    )

    export const fetchallcatagories = createAsyncThunk(
      'products/catagories',
          async () =>{
            const data = await fetchcatagories()
            return data
          }
      )

      export const fetchselectedproduct = createAsyncThunk(
        'products/selectedproduct',
            async (id) =>{
              const data = await fetchproductbyid(id);
              return data
            })


const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    brands: [],
    catagories: [],
    selectedporduct: {},
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
      })
      .addCase(fetchProductbyfilter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductbyfilter.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchallbrands.pending , (state)=>{
        state.status = 'loading';
        })
      .addCase(fetchallbrands.fulfilled , (state,action)=>{
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchallcatagories.pending , (state)=>{
        state.status = 'loading';
      })
      .addCase(fetchallcatagories.fulfilled , (state,action)=>{
        state.status = 'succeeded';
        state.catagories = action.payload;
      })
      .addCase(fetchselectedproduct.pending , (state)=>{
        state.status = 'loading';
      })
      .addCase(fetchselectedproduct.fulfilled , (state,action)=>{
        state.status = 'succeeded';
        state.selectedproduct = action.payload;
      });

  },
});
export const selectallproducts = (state) => state.productlist.products;
export const selectbrands = (state) => state.productlist.brands;
export const selectcatagories = (state) => state.productlist.catagories;
export const selectselectedproduct = (state) => state.productlist.selectedproduct;

export default productSlice.reducer;


// hy do w have to write the state.productlist.catagories; and not have to write when we are adding cases 
//