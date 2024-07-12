import { apiConnector } from "../apiconnector"
import {courseEndpoints} from "../apis"
import {setEntireCourseData} from "../../slices/viewCourseSlice"

const {GET_ALL_INSTRUCTOR_COURSES_API} =courseEndpoints

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