import React, { useState } from 'react'
import SignupForm from "./SignupForm"
import LoginForm from './LoginForm'
import HighlightText from '../HighlightText'


function Template({img1, img2,heading,subheading1,subheading2}) {
  const [profile , setProfile ]=useState("student")
  const [user,setUser] = useState("signup")
  function changeUserFunc(value) {
    setProfile(value)
  }

  return (
    <div className='flex mx-auto w-[100%] max-w-maxContent justify-evenly gap-16 py-10 flex-col lg:flex-row '>
        <div className='flex flex-col mx-auto  max-w-[470px]  md:m-0'>
            <div className='text-3xl text-richblack-5 pb-5 tracking-wide font-semibold '>{heading}</div>
            <div className='text-lg text-richblack-300'>{subheading1}</div>
            <div className='text-base font-edu-sa pb-6'><HighlightText text={subheading2}/></div>

            <div className='flex cursor-pointer flex-row rounded-full shadow-custom bg-richblack-800 w-fit p-1 gap-  '>
            <p className={`${profile === "student"? "text-white bg-richblack-900 ":" text-richblack-200" } rounded-full px-5 py-2`} onClick={()=>changeUserFunc("student")}>Student</p>
            <p className={`${profile === "instructor"? "text-white bg-richblack-900":"text-richblack-200" }  rounded-full px-5 py-2`} onClick={()=>changeUserFunc("instructor")}>Instructor</p>
        </div>
        <div className='md:m-auto w-full'>
            {user==="signup" ? <SignupForm/>: <LoginForm/>}
        </div>
        </div>

        <div className="relative mx-auto hidden lg:block  my-auto max-w-[450px] md:mx-0">
            <img
              src={img2}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={img1}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
        </div>
    </div>
  )
}

export default Template