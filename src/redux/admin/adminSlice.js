import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error:null,
    loading:false,
}

const adminSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
        },
        signInSuccess: (state, action)=>{
            state.currentUser = action.payload
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state,action)=>{
            state.error = action.payload
            state.loading = false
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
    }
})

export const {signInStart, signInSuccess, signInFailure, updateUserFailure, updateUserStart, updateUserSuccess, logout} = adminSlice.actions;
export default adminSlice.reducer;