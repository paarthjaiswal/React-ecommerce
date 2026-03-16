import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { checkUser, creatuser as creatuserApi, signOutUser, updateUser } from "./authAPI";

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

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (data) =>{
        const res = await updateUser(data);
        console.log("update user thunk")
        console.log(res)
        return res;
    }
)

export const signOutUserAsync = createAsyncThunk(
    'user/signOutUser',
    async (data) =>{
        const res = await signOutUser(data);
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
    .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Overwrite the old user data with the newly updated user data
        state.loggeduser = action.payload; 
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'pending';
        
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loggeduser = null
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = 'pending';
        
      })
    // You could also store an error message here: state.error = action.error.message;
}
})

export const selectuser = (state) => state.user.loggeduser;
export const seleerror = (state) => state.user.error;

export default authSlice.reducer;
