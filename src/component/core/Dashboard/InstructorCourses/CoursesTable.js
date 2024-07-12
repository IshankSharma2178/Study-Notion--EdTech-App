import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getInstructorCourses} from "../../../../services/operations/courseDetailAPI"

function CoursesTable() {
    
    const {token}= useSelector((state)=>state.auth)
    const dispatch =useDispatch()
    const {courseEntireData} = useSelector((state)=>state.viewCourse)
    console.log("==>",courseEntireData)
    const handleOnSubmit = ()=>{
        console.log("before")
        console.log(token)
            dispatch(getInstructorCourses(token))
    }
    
    return (
    <div>

    </div>
  )
}

export default CoursesTable