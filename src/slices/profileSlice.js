import {createSlice} from "@reduxjs/toolkit"

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null

const initialState = {
    userProfile: user !==null ?user.additionalDetails : null,
    loading:false
}

const profileSlice =createSlice({
    name:"profile",
    initialState :initialState,
    reducers:{
        setProfile(state,action){
            state.userProfile = action.payload;
        },
        setLoading(state,action){
            state.loading =action.payload;
        }
    }
})

export const {setProfile ,setLoading} = profileSlice.actions;
export default profileSlice.reducer;