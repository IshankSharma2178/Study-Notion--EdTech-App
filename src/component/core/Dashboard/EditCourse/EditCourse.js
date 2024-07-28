import React, { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import RenderSteps from "../AddCourse/RenderSteps"
import {setEditCourse , setCourse} from "../../../../slices/courseSlice"
import {getFullDetailsOfCourse} from "../../../../services/operations/courseDetailAPI"

function EditCourse() {
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state)=>state.course);
    const [loading, setLoading]  =useState();
    const {token}= useSelector((state)=>state.auth); 

    useEffect(() => {
        const populateCourseDetails = async() =>{
            setLoading(true)
            console.log("heello")
            const result = await getFullDetailsOfCourse(courseId, token)
            console.log("000000000",result)
            if (result) {
              dispatch(setEditCourse(true))
              dispatch(setCourse(result))
            }
            setLoading(false)
        }
        populateCourseDetails()
      }, [])

    if(loading) {
        return (
            <div className='spinner'></div>
        )
    }
       

    return (
    <div>
        <h1>Edit Course</h1>
        <div>
            {
                course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse