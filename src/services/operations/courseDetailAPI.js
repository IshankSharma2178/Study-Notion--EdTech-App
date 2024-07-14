import { apiConnector } from "../apiconnector"
import {courseEndpoints} from "../apis"
import {setEntireCourseData} from "../../slices/viewCourseSlice"
import toast from "react-hot-toast"

const {GET_ALL_INSTRUCTOR_COURSES_API
    ,COURSE_CATEGORIES_API,
    EDIT_COURSE_API,
    CREATE_COURSE_API
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
        result= response?.data?.Categorys
    }catch(e){
        console.log("Courses Categories api error ..." , e);
        toast.error(e.message)
    }
    return result
}

export const editCourseDetails = async (formData, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("EDIT COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details")
      }
      toast.success("Course Details Updated Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("EDIT COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details Added Successfully")
      result = response?.data?.newCourse
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }