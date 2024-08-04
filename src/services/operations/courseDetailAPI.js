import { apiConnector } from "../apiconnector"
import {courseEndpoints , commentEndpoint} from "../apis"
import {setEntireCourseData} from "../../slices/viewCourseSlice"
import toast from "react-hot-toast"

const {GET_ALL_INSTRUCTOR_COURSES_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED
    ,CATEGORIES_API,
    EDIT_COURSE_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    GET_COMPLETION_API,
    UPDATE_COURSE_STATUS_API,
    CREATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_COURSE_API,
    LECTURE_COMPLETION_API,
    UNMARK_COURSE_PROGRESS,
    CREATE_SECTION_API,
    COURSE_DETAILS_API,
    CREATE_RATING_API,
    GET_ALL_RATINGS,
    CREATE_COURSE_API
} =courseEndpoints

const {FETCH_COMMENTS,ADD_COMMENT} =commentEndpoint

export function getInstructorCourses(token){
    return async (dispatch) => {
        try{
            const resposnse =await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{
                Authorization: `Bearer ${token}`, 
            })

            dispatch(setEntireCourseData(resposnse.data.data))

        }catch(err){
            console.log(err)
        }
    }
}

export async function fetchCourseCategories(){
    let result= [];
    try{
        const response = await  apiConnector("GET",CATEGORIES_API)
      
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
      if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details")
      }
      toast.success("Course Details Updated Successfully")
      result = response?.data?.message
    } catch (error) {
      console.log("EDIT COURSE API ............", error)
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
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details Added Successfully")
      result = response?.data?.data
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
    const response = await apiConnector("DELETE",DELETE_COURSE_API,{courseId},{
      Authorization: `Bearer ${token}`
    })
    
    if(!response.data.success){
      throw new Error("could not delete course")
    }
    
    else{
          const  userData = JSON.parse(localStorage.getItem("user"))
          userData.courses = userData.courses.filter(course => course._id !== courseId);
          localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
} catch(error){
    console.log("error : "+error);
  }
}

export const updateCourseStatus= async (data,token)=>{
  try{
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
    const response = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId},
      {
         Authorization : `Bearer ${token}`
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)

  return result
}

export const getCourseDetails = async ( courseId) =>{
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    })
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

export const createRating = async (data,token) =>{
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error("You Already Review Course")
  }
  toast.dismiss(toastId)
  return success
}

export const getAllRating = async () =>{
  let ratingsArray = []
  try{
    const response = await apiConnector("GET",GET_ALL_RATINGS)
    ratingsArray =response?.data?.data
  }catch(error){
    console.log("GET_ALL_TAINGS_API_ERROR",error)
    
  }
  return ratingsArray;
}

export const markLectureAsComplete = async (data, token) => {
  let result = []

  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })


    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = response.data.courseProgress
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const unMarkLectureProgress = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UNMARK_COURSE_PROGRESS, data, {
      Authorization: `Bearer ${token}`,
    })


    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Marked Uncomplete")
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

export const fetchMarkedAsCompleted = async(data, token) => {
  let result = []
  
  try {
    const response = await apiConnector("POST", GET_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })


    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    result = response.data.courseProgress
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}
export const fetchComments = async(token,subSectionId,courseId) => {
  let result = [];
  try{
    const response = await apiConnector("POST",FETCH_COMMENTS,{subSectionId , courseId},{
      Authorization: `Bearer ${token}`,
    })

    result = response?.data?.comments;
    
  }catch(error){
    console.log("API error........" , error.message);
  }

  return result;
}

export const addComment = async (data, token) => {
  try {
    
    const response = await apiConnector("POST",ADD_COMMENT,data,{
        Authorization: `Bearer ${token}`,
      }
    );


    return response;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    result = response?.data?.data 
    
  } catch (error) {
    console.log("INSTRUCTOR  API ERROR............", error.message)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}