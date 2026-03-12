import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { checkUser, creatuser as creatuserApi } from "./authAPI";

const initialState ={
    loggeduser :null,
    status : 'idle',
    error : null
}
export const creatuserasyc = createAsyncThunk(
'user/createUser',
async (data)=>{
    const res = await creatuserApi(data)
    console.log("thunk thunk");
    console.log(data);
    return res;
}
)

export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (data) =>{
        const res = await checkUser(data);
        console.log("login thunk")
        console.log(res)
        return res;
    }
)

export const authSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {

},
extraReducers : (builder)=>{
    builder
    .addCase(creatuserasyc.pending , (state)=>{
        state.status = 'loading'
    })
    .addCase(creatuserasyc.fulfilled , (state,action)=>{
        state.status = 'succeeded'
        state.loggeduser = action.payload        
    })
    .addCase(creatuserasyc.rejected, (state, action) => {
    state.status = 'failed'
    })
    .addCase(checkUserAsync.pending, (state)=>{
        state.status = 'loading'
    })
    .addCase(checkUserAsync.fulfilled, (state,action)=>{
        state.status = 'succeed'
        state.loggeduser = action.payload
    })
    .addCase(checkUserAsync.rejected, (state, action)=>{
        state.status ='idle';
        state.error = action.error;
    })
    // You could also store an error message here: state.error = action.error.message;
}
})

export const selectuser = (state) => state.user.loggeduser;
export const seleerror = (state) => state.user.error;

export default authSlice.reducer;
