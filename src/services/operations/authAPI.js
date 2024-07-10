import { useDispatch, useSelector } from "react-redux";
import { setLoading ,setUser,setToken} from "../../slices/authSlice";  // Ensure correct import of setLoading
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { setUser as setProfileUser } from "../../slices/profileSlice";
import {settingsEndpoints} from "../apis";

const {SENDOTP_API,SIGNUP_API,LOGIN_API,RESETPASSTOKEN_API,RESETPASSWORD_API,} = endpoints;
const {UPDATE_DISPLAY_PICTURE_API}=settingsEndpoints;

export function signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate){

  return async (dispatch) => {
     const toastId = toast.loading("Loading...")
     dispatch(setLoading(true));

     try {
      console.log("Loading")
      const response = await apiConnector("POST", SIGNUP_API, {firstName,lastName,email,password,confirmPassword,accountType,otp})

      console.log("SIGNUP_API RESPONSE............", response)

      console.log(response.data.success)

      // if(!response.data.success){
      //   throw new Error(response.data.message)
      // }
      toast.success("Signup successful")
      navigate("/login")
     } catch (error) {
      console.log("SIGNUP_API ERROR............", error)
      toast.error("Could Not Sign up user")
     }
     dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}

export  function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));  
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });
      console.log("reset password response : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset Email Sent Successfully");
      setEmailSent(true);
    } catch (e) {
      console.log("reset password token error: ", e);
      toast.error("Reset password token error");
    }
    dispatch(setLoading(false));  
  };
}

export function resetPassword(password , confirmPassword  , token ){
    return async (dispatch) => {
        dispatch(setLoading(true));  
        try{
            console.log(RESETPASSWORD_API)
            const response = await apiConnector("POST" , RESETPASSWORD_API ,{password,confirmPassword,token});

            console.log(response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Password reset successfully");
        }catch(e){
            console.log("error ", e);
            toast.error("unable to reset password");
        }
        dispatch(setLoading(false));  
    }
}

export function sendOtp(email, navigate) {

  return async (dispatch) => {
     const toastId = toast.loading("Loading...")
     dispatch(setLoading(true));

     try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })

      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      console.log("navigate")
      navigate("/verify-email")
     } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
     }
     dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}

export function login(email,password,navigate){

  return async (dispatch)=>{
    dispatch(setLoading(true));

    try{
      const response = await apiConnector("POST",LOGIN_API,{email,password});

      if(!response.data.success){
        throw new Error(response.data.message)
      }
      console.log("response : => ",response)
      console.log("data ",JSON.stringify(response.data.user));
      toast.success("login successfully");
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      dispatch(setToken(JSON.stringify(response.data.token)))
      dispatch(setUser( response.data.user))
      dispatch(setProfileUser( (response.data.user)))
      navigate("/dashboard/my-profile")
      dispatch(setLoading(false));
      
    }catch(e){
      console.log("ERROR............", e)
      toast.error("Could Not Login")
    }
  }
}

export function logout(navigate){
  return async (dispatch) => {
    console.log("upi")
    dispatch(setLoading(true));
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setProfileUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out");
    dispatch(setLoading(false));
    navigate("/");
  }
}

