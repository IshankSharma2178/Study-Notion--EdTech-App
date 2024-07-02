import React from 'react'
import { Link } from 'react-router-dom'
import Template from '../component/core/HomePage/Auth/Template'
import img1 from "../assets/Images/signup.webp"
import img2 from "../assets/Images/frame.png" 

function Signup() {
  return (
    <div className='w-11/12 m-auto'>
    <Template 
      img1={img1}
      img2={img2}
      heading={"Join the millions learning to code with StudyNotion for free"}
      subheading1={"Build skills for today, tomorrow, and beyond."}
      subheading2={"Education to future-proof your career."}>
    </Template>

    </div>
  )
}

export default Signup