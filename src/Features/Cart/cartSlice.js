import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { addtoCart, getCartbyuser,updateCart,deleteCartItem} from "./cartApi"; 

const initialState ={
    items :[],
    status : 'idle',
}
export const addtoCartasync = createAsyncThunk(
'cart/addtoCart',
async (data)=>{
    const res = await addtoCart(data)
    console.log("addtocart thunk")
    console.log(res)
    return res;
}
)
export const fetchCartbyidasync = createAsyncThunk(
'cart/fetchcartbyid',
async (data)=>{
    console.log(data)
    const res = await getCartbyuser(data)
    console.log("addtocart thunk")
    console.log(res)
    return res;
}
)

export const updateCartasync = createAsyncThunk(
'cart/updateCart',
async (data)=>{
    console.log("updated"+data.quantity)
    console.log("lol"+data)
    const res = await updateCart(data)
    console.log("update cart thunk")
    console.log(res)
    return res;
}
)

export const deleteCartItemasync = createAsyncThunk(
    'cart/deleteCartItem',
    async (data) => {
        const res = await deleteCartItem(data)
        return res
    }
)

export const cartSlice = createSlice({
    name : 'cart',
    initialState ,
    reducers : {

},
extraReducers : (builder)=>{
    builder
    .addCase(addtoCartasync.pending , (state)=>{
        state.status = 'loading'
    })
    .addCase(addtoCartasync.fulfilled , (state,action)=>{
        state.status = 'succeeded'
        state.items.push(action.payload)        
    })
    .addCase(fetchCartbyidasync.pending , (state)=>{
        state.status = 'loading'
    })
    .addCase(fetchCartbyidasync.fulfilled , (state,action)=>{
        state.status = 'succeeded'
        console.log(action.payload);
        state.items= (action.payload)        
    })
    .addCase(updateCartasync.pending , (state)=>{
        state.status = 'loading'
    })
    .addCase(updateCartasync.fulfilled , (state,action)=>{
        state.status = 'succeeded'
        const index =  state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index] = action.payload       
    })
    // You could also store an error message here: state.error = action.error.message;
}
})

export const selectcart = (state) => state.cart.items;

export default cartSlice.reducer;
