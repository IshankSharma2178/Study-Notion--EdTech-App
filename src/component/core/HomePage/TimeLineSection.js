import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import image1 from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo:Logo1,
        heading: "Leadership",
        Description:"Fully committed to success company"
    },
    {
        Logo:Logo2,
        heading: "Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading: "Flexibility",
        Description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading: "Solve the problem",
        Description:"Code your way to a solution"
    },
]

function TimeLineSection() {
  return (
    <div>
        <div className='flex flex-col  lg:flex-row w-11/12 max-w-maxContent m-auto pb-16  gap-1 items-center '>
            {/* left */}
            <div className='w-[100%]items-center lg:w-[50%] flex  flex-col  '>
                {
                    timeline.map((element ,index)=>{
                        return (
                            <div className='flex flex-col'> 
                                <div className='flex flex-row gap-6'>
                                    <div className='rounded-full flex flex-col justify-center items-center  w-[52px] h-[52px] shadow-[#00000012] shadow-[0_0_62px_0] bg-white  '>
                                        <img className='md:w-[50%] md:h-[50%]' src={element.Logo}></img>
                                    </div>
                                    <div className='flex  flex-col'>
                                        <div className='text-[20px] font-semibold tracking-wide '>
                                            {element.heading}
                                        </div>
                                        <div className='text-[16px] tracking-wider'>
                                            {element.Description}
                                        </div>
                                    </div>
                                </div>
                                <div className={` ${index === 3 ? "hidden":""}   h-[70px] 
                                            border-dotted border-r border-richblack-100 ml-6  bg-richblack-400 w-[1px]`}> 
                                </div>
                            </div>
                        )
                    })
                }
            </div>


            {/* right */}

            <div className='relative lg:mt-auto mt-16 w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]'>
                <img  src={image1} className='shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit'/>
                <div className='flex bg-caribbeangreen-700 py-4 w-[70%] lg:w-auto lg:py-7 lg:top-auto top-0 gap-5 lg:gap-5 flex-col lg:flex-row  absolute  lg:px-5 lg:bottom-0  lg:translate-x-[5%] lg:translate-y-[40%]'> 
                    <div className='flex  gap-5 items-center lg:border-r pr-[75px] text-caribbeangreen-300 px-7 flex-row lg:justify-between'>
                        <p className='text-white lg:pr-10 pr-8 text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 lg:w-[75px] lg:text-wrap text-sm'>YEARS OF EXPERIENCE</p>
                    </div>
                    <div className='flex  gap-5 items-center  text-caribbeangreen-300 px-7 flex-row lg:justify-between'>
                        <p className='text-white lg:pr-10 pr-4 text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300  lg:w-[75px] text-sm' >TYPE OF COURSES</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TimeLineSection