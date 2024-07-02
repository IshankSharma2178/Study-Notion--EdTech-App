import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import CTAButton from "./Button"
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from './HighlightText'

function InstructorSection() {
  return (
    <div className='mt-14  w-11/12'>
        <div className='flex flex-col  lg:flex-row gap-20 items-center'>
            <div className='w-[100%] shadow-[-13px_-13px_0px_0px_rgb(255,255,255)] lg:w-[50%]'>
                <img src={Instructor} className=''/>
            </div>

            <div className='lg:w-[50%] flex flex-col gap-8'>
                <div className='text-4xl font-semibold'>Become an <HighlightText text={"Instructor"} /></div>
                <div className='font-medium text-[16px] w-[90%] text-lg tracking-wide text-richblack-300 '>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex flex-row text-base font-semibold gap-2 items-center'>
                            Start Learning Today <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>

  )
}

export default InstructorSection