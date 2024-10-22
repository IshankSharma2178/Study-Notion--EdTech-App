import React from 'react'
import { Link } from 'react-router-dom';

function Button({children , active ,linkto  }) {
  return (
    <Link to={linkto || null}>
 
        <div className={`text-center text-[17px] font-semibold text-nowrap px-6 py-3 rounded-md ${active?"bg-yellow-50 text-black" : "bg-richblack-800"} 
                        shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200 `}>
            {children}
        </div>

    </Link>
  )
}

export default Button