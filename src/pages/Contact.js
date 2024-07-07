import React from 'react'
import ContactUsForm from '../component/common/ContactUsForm'
import { BsFillChatRightDotsFill } from 'react-icons/bs';
import { BsGlobeAmericas } from 'react-icons/bs';
import { IoIosCall } from 'react-icons/io';
import Footer from '../component/common/Footer';

function Contact() {
  return (
    <div>
        <div className='max-w-maxContent mb-16 m-auto justify-between pt-[80px] gap-10 text-white w-11/12 flex flex-col flex-col-reverse  lg:flex-row '>
            <div className=' lg:w-[40%] flex flex-col gap-6 rounded-xl h-fit bg-richblack-800 p-4 lg:p-6'>
                <div className=''>
                    <h1 className='flex items-center gap-3 text-xl font-bold  text-richblack-5'><BsFillChatRightDotsFill className='text-richblack-200 ' />  Chat on us</h1> 
                    <div className='text-richblack-200 '>
                        <p>Our friendly team is here to help.</p>
                        <p>info@studynotion.com</p>
                    </div>
                </div>
                <div>
                    <h1 className='flex items-center gap-3 text-xl font-semibold text-richblack-5'><BsGlobeAmericas/> Visit us</h1> 
                    <div className='text-richblack-200 '>
                        <p>Come and say hello at our office HQ.</p>
                        <p>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                    </div> 
                </div>   
                <div>
                    <h1 className='flex items-center gap-3 text-xl font-semibold text-richblack-5'><IoIosCall/>Call us</h1> 
                    <div className='text-richblack-200 '>
                        <p>Mon - Fri From 8am to 5pm</p>
                        <p>+123 456 7869</p>
                    </div>
                </div>
            </div>
            <div className='border lg:w-[60%]  border-richblack-600 p-5 lg:p-10  rounded-lg '>
                <div className='flex flex-col justify-center  '>
                    <div className='flex m-auto items-start  w-fit flex-col'>
                        <h1 className='text-4xl font-bold md:w-[600px] lg:mb-2 w-[300px ] lg:w-[540px]'>Got a Idea? We've got the skills. Let's team up</h1>
                        <p className='text-richblack-400 mb-10'>Tell us more about yourself and what you're got in mind.</p>
                        <div className="md:w-[600px] w-[300px ] lg:w-[540px] m-auto flex flex-col gap-y-8 ">
                            <ContactUsForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     <Footer/>
    </div>
  )
}

export default Contact