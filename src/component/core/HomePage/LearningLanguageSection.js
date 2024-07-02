import React from 'react'
import HighlightText from './HighlightText';
import img1 from "../../../assets/Images/Plan_your_lessons.png";
import img2 from "../../../assets/Images/Know_your_progress.png";
import img3 from "../../../assets/Images/Compare_with_others.png";
import CTAButton from "./Button"


function LearningLanguageSection() {
  return (
    <div className='pb-14'>
      <div className='flex flex-col mt-[100px] gap-5 '>
        <div className='text-4xl m-auto font-semibold text-center'>
        Your Swiss Knife for {" "} <HighlightText text={"learning any language"}/>
        </div>

        <div className='text-center max-w-[65%] font-[500]  tracking-wide font-edu-sa    text-richblack-500 mx-auto text-base'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-center m-auto mt-10'>
          <img src={img2} className='object-contain lg:mb-0 -mb-16 lg:-mr-32 '/>
          <img src={img3} className='object-contain  '/>
          <img src={img1} className='object-contain  -mt-20 lg:mt-auto lg:-ml-32'/>
        </div>
        
        <div className='w-fit m-auto '>
          <CTAButton  active={true}>
              <div className='px-2 font-bold tracking-wide text-[1.1rem]'>Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection