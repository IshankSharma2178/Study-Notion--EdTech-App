import { apiConnector } from "../apiconnector"
import {courseEndpoints} from "../apis"
import {setEntireCourseData} from "../../slices/viewCourseSlice"
import toast from "react-hot-toast"

const {GET_ALL_INSTRUCTOR_COURSES_API
    ,COURSE_CATEGORIES_API
} =courseEndpoints

export function getInstructorCourses(token){
    return async (dispatch) => {
        try{
            const resposnse =await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{
                Authorization: `Bearer ${token}`, 
            })

            dispatch(setEntireCourseData(resposnse.data.data))
            console.log(resposnse)
        }catch(err){
            console.log(err)
        }
    }
}

export async function fetchCourseCategories(){
    let result= [];
    try{
        const response = await  apiConnector("GET",COURSE_CATEGORIES_API)
        console.log("Courses Categories api response"  , response);
        if(!response?.data?.success){
            throw new Error("Could not get courses categories")
        }
        result= response?.data?.data
    }catch(e){
        console.log("Courses Categories api error ..." , e);
        toast.error(e.message)
    }
    return result
}