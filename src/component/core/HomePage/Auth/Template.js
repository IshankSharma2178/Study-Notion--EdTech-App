import React, { useState } from 'react'
import SignupForm from "./SignupForm"
import LoginForm from './LoginForm'
import HighlightText from '../HighlightText'
import { useSelector } from 'react-redux'
import graphic5 from "../../../../assets/Logo/graphic5.svg"

function Template({img1, img2,heading,subheading1,subheading2,formType}) {
const {loading} =useSelector((state)=>state.auth)

  return (
    
    <div className="grid min-h-[calc(100vh-3.5rem)] md:place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent  flex-col justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-full md:w-11/12 md:max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {heading}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{subheading1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {subheading2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative md:block hidden place-content-center mx-auto w-11/12 max-w-[500px] md:mx-0">
            {/* <img
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
            /> */}

            <img  
              alt='logo-image'
              width={800}
              loading="lazy"
              height={504}
              src={img1}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template