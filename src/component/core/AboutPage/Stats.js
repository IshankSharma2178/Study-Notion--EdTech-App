import React from 'react'

function Stats() {
  return (
    <div className='bg-richblack-700 w-[]  '>
        <div className='flex flex-row flex-wrap justify-evenly m-auto  w-[100%] max-w-maxContent'>
            <div className='flex flex-col'>
                <h1>5K</h1>
                <p>Active Students</p>
            </div>
            <div className='flex flex-col'>
                <h1>10+</h1>
                <p>Mentors</p>
            </div>
            <div className='flex flex-col'>
                <h1>200+</h1>
                <p>Courses</p>
            </div>
            <div className='flex flex-col'>
                <h1>50+</h1>
                <p>Awards</p>
            </div>
        </div>
    </div>
  )
}

export default Stats