import React from 'react'
import { Link } from 'react-router-dom'
import Template from '../component/core/HomePage/Auth/Template'
import img1 from "../assets/Images/signup.webp"
import logo from "../assets/Logo/graphic2.svg"

function LoginPage() {
  return (
    <div className='h-[90vh]'>
    <Template 
      img1={logo}
      
      heading={"Welcome Back"}
      subheading1={"Build skills for today, tomorrow, and beyond."}
      subheading2={"Education to future-proof your career."}
      formType={"login"}>
    </Template>
    </div>
  )
}

export default LoginPage