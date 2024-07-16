import React, { useState } from 'react'
import RenderSteps from './RenderSteps'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

function AddCourse() {

  const [show ,setShow] =useState(false)

  return (
    <div className='text-white w-[100%]'>
        <div className='flex justify-between '>
            <h1 className='text-3xl  text-richblack-5'>Add Course</h1>
            {/* <div className="fixed m-auto right-0 top-10  max-w-[400px] flex-1 transition-all duration-300 rounded-md border-[1px] border-richblack-700 bg-transparent    ">
              <p className=" text-lg text-richblack-5">
                ⚡ Course Upload Tips
                  <button
                    onClick={() =>setShow(!show)}
                  ><MdKeyboardDoubleArrowDown /></button>
              </p>

              {
                show &&
              <div className=' z-50'>
                <ul className="ml-5 list-item list-disc fixed space-y-4 text-xs text-richblack-5">
                  <li>Set the Course Price option or make it free.</li>
                  <li>Standard size for the course thumbnail is 1024x576.</li>
                  <li>Video section controls the course overview video.</li>
                  <li>Course Builder is where you create & organize a course.</li>
                  <li>
                    Add Topics in the Course Builder section to create lessons,
                    quizzes, and assignments.
                  </li>
                  <li>
                    Information from the Additional Data section shows up on the
                    course single page.
                  </li>
                  <li>Make Announcements to notify any important</li>
                  <li>Notes to all enrolled students at once.</li>
                </ul>
              </div>
              }
            </div> */}
        </div>

        <div>
          <RenderSteps />
        </div>

    </div>
    
  )
}

export default AddCourse

