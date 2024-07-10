import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading:false
}
console.log(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null)
const profileSlice =createSlice({
    name:"profile",
    initialState :initialState,
    reducers:{
        setUser(state,action){
            state.user = action.payload;
        },
        setLoading(state,action){
            state.loading =action.payload;
        }
    }
})

export const {setUser ,setLoading} = profileSlice.actions;
export default profileSlice.reducer;