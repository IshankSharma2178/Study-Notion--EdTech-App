import React from 'react'
import CTAButton from './Button'
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({position,heading,subheading,Ellipse ,ctabtn1,ctabtn2, codeblock,gradiant , codeColor}) {

  
    return (
        
    <div className={`flex ${position} lg:flex-row flex-col w-11/12 max-w-maxContent my-10 lg:my-20 justify-between gap-y-10 lg:justify-evenly md:gap-16 lg:gap-10  `}>
    
      {/* left1 */}
        <div className='lg:w-[40%] w-[100%]  md:ml-1 flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold '>
                {subheading}
            </div>
            <div className='flex gap-7  mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

     {/* right */}
        <div className=' md:w-[90%] w-[108%] h-fit py-3  lg:w-[31rem]  flex flex-row  code-border text-[0.7rem] md:text-[1rem] relative  border-[rgba(255, 255, 255, 0.22)]'>
            <img src={Ellipse} alt="" loading="lazy" className='absolute   md:w-max md:h-max h-[303px] blur-xl  opacity-1  -left-10 -top-20'></img>
            <div className='text-center    flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p> 
            </div>
            <div className={`w-[90%]  flex flex-col  gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                    sequence={[codeblock,1000,""]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    cursor={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block",
                        }
                    }
                />
            </div>  
        </div>

    </div>
  )
}

export default CodeBlocks