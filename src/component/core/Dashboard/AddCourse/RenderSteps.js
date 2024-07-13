import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseConfirmationForm from './CourseConfirmationForm'

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
    <>
        <div>
            {steps.map((item)=>{
                return <>
                    <div>
                        <div className={`${step === item.id ? "border-yellow-50 text-yellow-50 bg-yellow-900"
                                                                :"border-richblack-700 bg-richblack-800 text-ichblack-300"}`} >
                            {
                                step>item.id ? (<FaCheck/>) :(item.id )
                            }

                        </div>
                    </div>
                    {
                        item.id !== steps.length 
                    }
                </>
        })}
        </div>
        <div>
            {steps.map((item)=>{
                return <>
                    <div>
                        <p>{item.title}</p>
                    </div>
                </>
            })}
        </div>

        {step===1 && <CourseConfirmationForm/>}
    </>
  )
}

export default RenderSteps