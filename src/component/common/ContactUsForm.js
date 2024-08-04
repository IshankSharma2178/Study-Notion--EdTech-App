import React, { useState ,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {countrycode} from "../../data/countrycode"
import { apiConnector } from '../../services/apiconnector'

function ContactUsForm() {
    const [loading , setLoading] = useState(false)
    const{register , handleSubmit ,reset , formState:{errors , isSubmitSuccessful} } =useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",firstname:"",lastname:"",message:"",phoneNo:"",countrycode:""
            })
        }
    },[reset,isSubmitSuccessful])

    const submitContactForm = async(data) =>{
        
        try{
            setLoading(true);
            // const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_APU,data)
         
            setLoading(false)
        }catch(err){
            console.log("error",err.message)
            setLoading(false);
        }
    }

    return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div >
            <div className='flex flex-row  w-[100%] gap-4'>
                <div  className='flex flex-col w-[50%]' >
                    <label htmlFor='firstname' className='text-richblack-100 pb-2'>First Name</label>
                        <input 
                            type='text'
                            name='firstname'
                            id='firstname'
                            placeholder='Enter first name'
                            className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-800 focus:shadow-none  p-[12px] text-richblack-5"
                            {...register("firstname",{required:true})}
                        />
                        {
                            errors.firstname && (
                                <span className='text-pink-200 text-sm'>*Please Enter First Name </span>
                            )
                        }
                </div>
                <div className='flex flex-col w-[50%]'>
                    <label htmlFor='lastname' className='text-richblack-100  pb-2'>Last Name</label>
                        <input 
                            type='text'
                            name='lastname'
                            id='lastname'
                            placeholder='Enter last name'
                            className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-800 p-[12px] focus:shadow-none text-richblack-5"
                            {...register("lastname",{required:true})}
                        />
                        {
                            errors.lastname && (
                                <span className='text-pink-200 text-sm'>Please Enter Last Name </span>
                            )
                        }
                </div>
            </div>
            <div className='flex flex-col'>
                <label htmlFor='email' className='text-richblack-100  pb-2 mt-7'>Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email address'
                    className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-800 focus:shadow-none p-[12px] text-richblack-5"
                    {...register("email",{required:true})}
                />
                                     {
                            errors.email && (
                                <span className='text-pink-200 text-sm'>Please Enter Email </span>
                            )
                        }
            </div>
            <div className='flex flex-col'>
                <label  className='text-richblack-100  pb-2 mt-7' >Phone Number</label>
                    <div  className='flex gap-4 flex-row'>
                        <select
                        defaultValue=""
                        className='w-[77px] rounded-[0.5rem] outline-none shadow-custom bg-richblack-800 focus:shadow-none p-[12px] text-richblack-5'
                        name="dropdown"
                        id="dropdown"
                        {...register("countrycode",{required:true})}
                        >
                            {
                                countrycode.map((element,index)=>{
                                    return (
                                        <option   key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <input 
                            type="phoneNo"
                            placeholder='Enter phone number'
                            id="phoneNo"
                            {...register("phoneNo",{required:true})}
                            className='w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-800 focus:shadow-none p-[12px] text-richblack-5'
                        />
                    </div>
            </div>

            <div className='flex flex-col'>
                <label htmlFor='message' className='text-richblack-100  pb-2 mt-7'>Message</label>
                <textarea 
                    type='message'
                    name='message'
                    placeholder='Enter message'
                    id='message'
                    cols="30"
                    rows="7 "
                    className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-800 p-[12px] focus:shadow-none text-richblack-5"
                    {...register('message',{required:true})}
                />
                                     {
                            errors.message&& (
                                <span className='text-pink-200 text-sm'>Please Enter Message </span>
                            )
                        }
            </div>

            <button type="submit" className='text-center w-full mt-8 text-[17px] font-semibold text-nowrap px-6 py-3 rounded-md bg-yellow-50 text-black
                        shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200'>
                Send Message
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm