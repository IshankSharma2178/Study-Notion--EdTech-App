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
    const token =useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        const setCourseSpecififcDetails = async()=>{
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.setCompletedLectures));
            let lectures =0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
                lectures += sec.subSection.length;
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecififcDetails()
    })
  return (
    <>
        <div>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div>
                <Outlet />
            </div>
        </div>
        {reviewModal && <CourseReviewModal />}
    </>
  )
}

export default ViewCourse