import React from 'react'

function Stats() {
  return (
    <div className='bg-richblack-700 h-[200px] md:h-[150px]  flex justify-center '>
        <div className='grid  md:grid-cols-4 md-gap-0 gap-y-5  text-center grid-cols-2 justify-evenly  m-auto   w-[100%] max-w-maxContent'>
            <div className='flex flex-col'>
                <h1  className='text-[30px] font-bold text-richblack-5'>5K</h1>
                <p className='font-semibold text-[16px] text-richblack-500'>Active Students</p>
            </div>
            <div className='flex flex-col'>
                <h1  className='text-[30px] font-bold text-richblack-5'>10+</h1>
                <p className='font-semibold text-[16px] text-richblack-500'>Mentors</p>
            </div>
            <div className='flex flex-col'>
                <h1  className='text-[30px] font-bold text-richblack-5'>200+</h1>
                <p className='font-semibold text-[16px] text-richblack-500'>Courses</p>
            </div>
            <div className='flex flex-col'>
                <h1  className='text-[30px] font-bold text-richblack-5'>50+</h1>
                <p className='font-semibold text-[16px] text-richblack-500'>Awards</p>
            </div>
        </div>
    </div>
  )
}

export default Stats