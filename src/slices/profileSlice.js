import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading:false
}

const profileSlice =createSlice({
    name:"profile",
    initialState :initialState,
    reducers:{
        setProfileUser(state,action){
            state.user = action.payload;
        },
        setLoading(state,action){
            state.loading =action.payload;
        }
    }
})

export const {setProfileUser ,setLoading} = profileSlice.actions;
export default profileSlice.reducer;