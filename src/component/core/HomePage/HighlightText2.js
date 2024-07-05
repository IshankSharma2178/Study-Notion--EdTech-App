import React from 'react'

function HighlightText2({text}) {
  return (
    <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>
        {text}
    </span>
  )
}

export default HighlightText2