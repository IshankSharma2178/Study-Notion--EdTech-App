import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,          // localstorage m token save rahega agr app browser close bhi kr de toh
}

const authSlice =createSlice({
    name:"auth",
    initialState :initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload;
        }
    }
})

export const {setToken} = authSlice.actions;
export default authSlice.reducer;