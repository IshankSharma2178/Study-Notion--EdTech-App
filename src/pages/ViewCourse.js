import React, { useState } from 'react'
import VideoDetailsSidebar from "../component/core/ViewCourse/VideoDetailsSidebar"
import CourseReviewModal from "../component/core/ViewCourse/CourseReviewModal"
import {Outlet } from "react-router-dom"

function ViewCourse() {
    const [reviewModal , setReviewModal] = useState(false)
    const [loading] = useState(false)

   
    
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