import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseConfirmationForm from './CourseConfirmationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import { CgBorderStyleDotted } from "react-icons/cg";

function RenderSteps() {

    const {step} = useSelector((state)=>state.course)

    const steps = [
        {
            id:1,
            title: "Course Information"
        },
        {
            id:2,
            title: "Course Builder"
        },
        {
            id:3,
            title: "Publish"
        }
    ]

  return (
    <div className='w-[100%] my-16'>
        <div className="relative mb-2 flex w-full justify-center">
            {steps.map((item)=> (
                <>  
                {/* Step Circle */}
                    <div className="flex flex-col items-center " key={item.id}>
                        <button
                        className={`cursor-default aspect-square w-[34px]
                         place-items-center rounded-full border-[1px] 
                         ${step === item.id ? ' border-yellow-50 bg-yellow-900 text-yellow-50' 
                         : ' border-richblack-700 bg-richblack-800 text-richblack-300'}
                         ${step > item.id ? ' bg-yellow-50' :'text-yellow-50'}`}
                         >
                            {step > item.id ? (
                                <FaCheck className='font-bold text-richblack-900'/>
                            ) : 
                            (item.id)}
                        </button>
                    </div>
                {/* Dotted Line */}
                    {item.id !== steps.length && (
                        <>
                            <div key={item.id}
                            className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 
                            ${step > item.id  ? "border-yellow-50" : "border-richblack-500"}`}
                            ></div>
                        </>
                    )}
                </>
            ))}
        </div>

        {/* Steps titles */}
      <div className="relative mb-16 flex m-auto w-full select-none justify-between text-wrap md:w-[88%]">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] items-center flex-col  break-words gap-y-2"
              key={item.id}
            >
              
              <p
                className={`text-sm text-wrap  break-words ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </>
        ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseConfirmationForm />}
      {step === 2 && <CourseBuilderForm />}
      {/* {step === 3 &&  <PublishCourse /> } */}

    </div>
  )
}

export default RenderSteps