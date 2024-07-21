import { apiConnector } from "../apiconnector"
import {courseEndpoints} from "../apis"
import {setEntireCourseData} from "../../slices/viewCourseSlice"
import toast from "react-hot-toast"

const {GET_ALL_INSTRUCTOR_COURSES_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED
    ,COURSE_CATEGORIES_API,
    EDIT_COURSE_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    UPDATE_COURSE_STATUS_API,
    CREATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_COURSE_API,
    CREATE_SECTION_API,
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
      result = response?.data?.message
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
      result = response?.data?.data
      console.log("result in api ",result)
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  // create a section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

  // create a subsection
export const createSubSection = async (data, token) => {
  let result = null
  
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response?.data?.data)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  console.log("one")
  return result
}


// update a section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null
  
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.sectionResponse
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`, 
  })
    console.log("DELETE SECTION API RESPONSE............", response.data.data)
    if (!response?.data) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteCourse = async (courseId,token) =>{
  try{
    console.log(`deleting ${courseId}`)
    const response = await apiConnector("DELETE",DELETE_COURSE_API,{courseId},{
      Authorization: `Bearer ${token}`
    })
    console.log("api resonse  : ",response);
    
    if(!response.data.success){
      throw new Error("could not delete course")
    }
    else{
      return true;
    }
} catch(error){
    console.log("error : "+error);
  }
}

export const updateCourseStatus= async (data,token)=>{
  try{
    console.log("updateCourseStatus",data,token);
    const response = await apiConnector("POST",UPDATE_COURSE_STATUS_API,data,{
      Authorization : `Bearer ${token}`
    })
    return(response)
  }catch(error){
    console.log("error : ",error);
  }
}


export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId,},
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.courseDetails
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  console.log(result)
  return result
}
