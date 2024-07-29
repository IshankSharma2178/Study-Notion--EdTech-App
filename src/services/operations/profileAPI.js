import { apiConnector } from "../apiconnector";
import {profileEndpoints} from "../apis"
import toast from "react-hot-toast"

const {GET_INSTRUCTOR_DATA_API ,GET_USER_ENROLLED_COURSES_API,GET_USER_DETAILS_API} =profileEndpoints

export const getUserEnrolledCourses = async(token)=>{
        const toastId=toast.loading("Loading...");
        let result=[];
        try{
            const response=await apiConnector("POST",GET_USER_ENROLLED_COURSES_API,{
                Authorization: `Bearer ${token}`, 
            })
            toast.dismiss(toastId);
            return result = response.data.data.courses;
        }
        catch(err){
            console.log("Error in getuserEnrolledCourses API.....",err);
        }
        toast.dismiss(toastId);
        return result;
    
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
  
      const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null,
      {
        Authorization: `Bearer ${token}`
      } )
      console.log("GET_INSTRUCTOR_DATA_API response....", response)
      result= response?.data?.courses

    } catch (error) {
      console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
      toast.error("Could Not Get Instructor Data")
    }
    toast.dismiss(toastId)
    return result
  }
