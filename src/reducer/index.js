import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import cartReducer from "../slices/cartSlice"
import profileReducer from "../slices/profileSlice"

const rootReducer = combineReducers({
    auth :  authReducer,
    profile:profileReducer,
    cart:cartReducer,
})

export default rootReducer