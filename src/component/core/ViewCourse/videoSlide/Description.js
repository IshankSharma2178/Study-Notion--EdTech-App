import React from 'react'

function Description({description}) {

  return (
    <div className='mt-5 mb-10'>
      <div className='text-richblack-100 '>
        {description}
      </div>
    </div>
  )
}

export default Description