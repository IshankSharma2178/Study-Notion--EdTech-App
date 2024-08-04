import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {updateProfileInfo} from "../../../../services/operations/SettingAPI"

function PersonalInformationUpload() {
  const{register , handleSubmit ,reset,setValue, getValues, formState:{errors , isSubmitSuccessful} } =useForm();
  const {user} =useSelector((state)=>state.auth)
  const {userProfile} = useSelector((state)=>state.profile);
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);

  const submitHandler = async(data)=>{
    const {contactNumber,dateOfBirth,firstName,lastName,gender,about} = data;
    dispatch(updateProfileInfo(token,contactNumber,dateOfBirth,firstName,lastName,gender,about));
  }

  useEffect(()=>{
    if(user.firstName)setValue("firstName",user.firstName);
    if(user.lastName)setValue("lastName",user.lastName);
    if(userProfile.dateOfBirth)setValue("dateOfBirth",userProfile.dateOfBirth);
    if(userProfile.about)setValue("about",userProfile.about);
    if(userProfile.gender)setValue("gender",userProfile.gender);
    if(userProfile.contactNumber)setValue("contactNumber",userProfile.contactNumber);
  },[])
    return (
      
    <form className='flex flex-col w-[90%] m-auto gap-2' onSubmit={handleSubmit(submitHandler)}>
      <div className='flex flex-col  gap-6 text-white m-auto w-[100%]  bg-richblack-800 rounded-xl border border-richblack-600 p-6 '>
          <h1 className='text-2xl font-semibold '>
            Profile Information
          </h1>
          
          <div className='flex md:flex-row flex-col  w-full gap-5'>
            <div className='flex flex-col w-full md:w-[50%] gap-1'>
              <label htmlFor='firstName'>First Name</label>
              <input 
                name="firstName"
                id="firstName"
                type='text'
                className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-700 focus:shadow-none  p-[12px] text-richblack-5"
                {...register("firstName")}
              />
            </div>
            <div className='flex flex-col w-full md:w-[50%] gap-1'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                name='lastName'
                id='lastName'
                type='text'
                className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-700 focus:shadow-none  p-[12px] text-richblack-5"
                {...register("lastName")}
              />
            </div>
          </div>
          
          <div className='flex md:flex-row flex-col   w-full gap-5'>
            <div className='flex flex-col w-full md:w-[50%] gap-1'>
              <label htmlFor='dateOfBirth'>Date of Birth</label>
              <input
                name='dateOfBirth'
                id='dateOfBirth'
                type='date'
                className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-700 focus:shadow-none  p-[12px] text-richblack-5"
                {...register("dateOfBirth")}
              />
            </div>
            <div className='flex flex-col w-full md:w-[50%] gap-1 '>
              <label htmlFor='gender'>Gender</label>
              <select 
                name='gender'
                id='gender'
                className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-700 focus:shadow-none py-[15px] p-[12px] text-richblack-5"
                {...register("gender")}
              >
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
            </div>
          </div>
          
          <div  className='flex md:flex-row flex-col   w-full gap-5'>
            <div className='flex flex-col w-full md:w-[50%] gap-1'>
              <label htmlFor='contactNumber'>Phone Number</label>
              <input
                name='contactNumber'
                id='contactNumber'
                type='number'
                className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-700 focus:shadow-none  p-[12px] text-richblack-5"
                {...register("contactNumber")}
              />
            </div>
            <div className='flex flex-col w-full md:w-[50%] gap-1'>
              <label htmlFor='about'>About</label>
              <input 
                name='about'
                id='about'
                className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-700 focus:shadow-none  p-[12px] text-richblack-5"
                type='text'
                {...register("about")}
              />
            </div>
          </div>
      </div>

      <div className='text-end p'>
          <button type="submit" className='text-center w-full md:w-fit mt-1 md:mt- text-[17px] font-semibold text-nowrap px-6 py-3 rounded-md bg-yellow-50 text-black
                        shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200'>
                Submit
          </button>
      </div>
    </form>
  )
}

export default PersonalInformationUpload

