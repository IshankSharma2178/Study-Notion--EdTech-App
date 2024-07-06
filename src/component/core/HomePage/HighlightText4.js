import React from 'react'

function HighlightText4({text}) {
  return (
    <span>
        <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text  font-semibold text-transparent  '>
            {text}
        </h1>
    </span>
  )
}

export default HighlightText4