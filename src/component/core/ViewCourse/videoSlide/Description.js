import React from 'react'

function Description({course}) {
  return (
    <div className='mt-5 mb-10'>
      <div className='text-richblack-100 '>
        {course.courseDescription}
      </div>
    </div>
  )
}

export default Description