import React from 'react'
import * as Icons from "react-icons/fi" 

function IconBtn({text , onClick,children,disabled,outline=false,customClass,type,icon}) {

  const Icon =Icons[icon]
  return (
    <button disabled={disabled} onClick={onClick} type={type}>
        {
            !children?(
                <>
                    <span className='flex flex-row items-center w-fit ransition-all hover:scale-95 hover:shadow-none duration-200 shadow-custom justify-center gap-2 py-2 px-4 bg-yellow-50 rounded-lg text-black'>
                    { icon && <Icon className="font-bold " /> }
                      <div className='font-semibold'>
                        {text}
                      </div>
                    </span>
                    {children}
                </>
                )
                :
                (<></>)
        }
    </button>
  )
}

export default IconBtn