import { toast } from "react-hot-toast"
import { setProfile } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"
import {setUser ,setToken} from "../../slices/authSlice"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      console.log("Display Picture Updated Successfully",response)
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfileInfo(token,contactNumber,dateOfBirth,firstName,lastName,gender,about){
  return async (dispatch) =>{
    try{
      console.log(contactNumber,dateOfBirth,firstName,lastName,gender,about)
      const response = await apiConnector("PUT",UPDATE_PROFILE_API,{contactNumber,dateOfBirth,firstName,lastName,gender,about} ,{
         Authorization: `Bearer ${token}`
      })
      
      console.log("response + =",response);
      dispatch(setUser(response.data.userData))
      dispatch(setProfile(response.data.profileData))
      toast.success("Changed Successfully")

    }catch(e){
      console.log("hii")
        console.log(e)
    }
  }
}

export function updatePassword(token,currentPassword , newPassword){
  return async(dispatch)=>{
    try{
      const response = await apiConnector("POST", CHANGE_PASSWORD_API,{currentPassword,newPassword},{
        Authorization: `Bearer ${token}`, 
    } )
      console.log(response)
      toast.success("Changed Successfully")
    }catch(e){
      console.log(e)
    } 
  }
}

export function deleteAccount(token,navigate){
  return async (dispatch) => { 
    try{
      const response = await apiConnector("DELETE",DELETE_PROFILE_API, null,{
        Authorization: `Bearer ${token}`, 
    })
      localStorage.clear();
      dispatch(setUser(null))
      dispatch(setToken(null))
      dispatch(setProfile(null))
      navigate("/")
      toast.success("Account deleted successfully")
    }catch(err){
      console.log(err)
    }
  }
}