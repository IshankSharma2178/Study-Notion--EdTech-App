import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailAPI';
import { setTotalNoOfLectures ,setCompletedLectures ,setEntireCourseData ,setCourseSectionData} from '../slices/viewCourseSlice';
import VideoDetailsSidebar from "../component/core/ViewCourse/VideoDetailsSidebar"
import CourseReviewModal from "../component/core/ViewCourse/CourseReviewModal"
import {Outlet } from "react-router-dom"

function ViewCourse() {

    const [reviewModal , setReviewModal] = useState(false)
    const {courseId} =useParams(); 
    const [loading ,setLoading] =useState(false)
    const {token} =useSelector((state)=>state.auth);
    const dispatch = useDispatch();

   
    
  return (
    <>  {
        loading ?( <div className='spinner'></div>):
         (<div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
            <div className="h-[calc(100vh-3.5rem)] flex-1 m-auto overflow-auto">
                <div className=" m-auto mx-auto w-11/12 max-w-[1000px] ">
                <Outlet />
                </div>
            </div>
            {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
        </div>)
        
    }
    </>
  )
}

export default ViewCourse