import { apiConnector } from "../apiconnector";
import {profileEndpoints} from "../apis"
import toast from "react-hot-toast"

const {GET_INSTRUCTOR_DATA_API ,GET_USER_ENROLLED_COURSES_API,GET_USER_DETAILS_API} =profileEndpoints

export const getUserEnrolledCourses = async(token)=>{
        const toastId=toast.loading("Loading...");
        let result=[];
        try{

            const response=await apiConnector("POST",GET_USER_ENROLLED_COURSES_API,null,{
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