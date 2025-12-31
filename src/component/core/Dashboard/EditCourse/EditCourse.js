import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import RenderSteps from "../AddCourse/RenderSteps"
import {setEditCourse , setCourse} from "../../../../slices/courseSlice"
import { useFullCourseDetails } from "../../../../hooks/useCourses"

function EditCourse() {
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state)=>state.course);
    const { data: courseData, isLoading } = useFullCourseDetails(courseId);

    useEffect(() => {
        if (courseData && courseData.courseDetails) {
            dispatch(setEditCourse(true))
            dispatch(setCourse(courseData.courseDetails))
        }
    }, [courseData, dispatch])

    if(isLoading) {
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