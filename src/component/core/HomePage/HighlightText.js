import React from 'react'

function HighlightText({text}) {
  return (
    <span className='bg-gradient-to-b  text-nowrap from-[rgba(31,162,255,1)] via-[rgba(18,216,250,1)] to-[rgba(166,255,203,1)] inline-block text-transparent bg-clip-text font-bold'>
        { text}
    </span>
  )
}

export default HighlightText