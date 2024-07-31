import React from 'react'
import { Link } from 'react-router-dom'
import Template from '../component/core/HomePage/Auth/Template'
import img1 from "../assets/Logo/graphic4.svg"


function Signup() {
  return (
    <div className='h-auto'>
    <Template 
      img1={img1}
      heading={"Join the millions learning to code with StudyNotion for free"}
      subheading1={"Build skills for today, tomorrow, and beyond."}
      subheading2={"Education to future-proof your career."}
      formType={"signup"}>
    </Template>

    </div>
  )
}

export default Signup