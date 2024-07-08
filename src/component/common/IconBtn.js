import React from 'react'
import * as Icons from "react-icons/fi" 

function IconBtn({text , onClick,children,disabled,outline=false,customClass,type,icon}) {

  const Icon =Icons[icon]
  return (
    <button disabled={disabled} onClick={onClick} type={type}>
        {
            !children?(
                <>
                    <span>
                        <Icon/>
                        {text}
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