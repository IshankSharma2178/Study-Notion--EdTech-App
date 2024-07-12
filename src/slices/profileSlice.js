import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    userProfile: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).additionalDetails : null,
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