import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import IconBtn from '../../common/IconBtn';



function MyProfile() {
    const {user} =useSelector((state)=>state.profile)
    console.log("my user",user)
    const navigate=useNavigate();

    return (
    <div className='text-white w-[85%] content-start gap-4 m-auto flex flex-col '>
        <h1 className='text-3xl font-semibold text-richblack-5 '>
            My Profile
        </h1>
        
        {/* Block 1 */}
        <div className='flex flex-row bg-richblack-800 rounded-xl border border-richblack-600 p-6 justify-between'>  
            <div className='flex gap-6 justify-center items-center'>
                <img 
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className='aspect-square w-[68px] rounded-full object-cover'
                />
                <div>
                    <p className='text-[18px]'>{user?.firstName+" "+user?.lastName}</p>
                    <p className='text-richblack-300 text-[14px]'>{user?.email}</p>
                </div>
            </div>
            <IconBtn 
                text="Edit"
                onClick={()=>{
                    navigate("/dashboard/settings")
                }}
            />
        </div>

        {/* Block 2 */}
        <div className='bg-richblack-800 flex flex-col gap-3 p-6 rounded-xl border border-richblack-600'>
            <div className='flex justify-between'>
                <p>About</p>
                <IconBtn text="Edit" onClick={(()=>{navigate("/dashboard/settings")})}/>
                
            </div>
            <div className='overflow-auto w-[70%]  text-richblack-200'>
                {
                    user.additionalDetails.about ===null ? 
                    <div>
                        Write Something About Yourself
                    </div>
                    :
                    <div>
                        { user.additionalDetails.about }
                    </div>
                }
            </div>
            
        </div>

        {/* Block 3 */}
        <div className='flex flex-col bg-richblack-800 gap-10 p-6 rounded-xl border border-richblack-600'>
            <div className='flex flex-row justify-between  items-center' >
                <p className='text-richblack-5 text-[17px] tracking-wide' >Personal Details</p>
                <IconBtn text="Edit" icon="FiEdit" onClick={(()=>{navigate("/dashboard/settings")})}/>
            </div>

            <div className='grid grid-cols-2 grid-rows-2 gap-6'>
            <div className='flex flex-col gap-2'>
                <p className='text-richblack-5'>First Name</p>
                <p  className='text-richblack-200'>{user?.firstName}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-richblack-5'>Last Name</p>
                <p className='text-richblack-200'>{user?.lastName}</p>
            </div>
            <div className='flex flex-col gap-2 '>
                <p className='text-richblack-5'>Email Address</p>
                <p className='text-richblack-200'>{user?.email}</p>
            </div>
            <div className='flex flex-col gap-2 '>
                <p className='text-richblack-5'>Gender</p>
                <p className='text-richblack-200'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
            </div>
            <div className='flex flex-col gap-2 '>
                <p className='text-richblack-5'>Contact Number</p>
                <p className='text-richblack-200'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>
            <div className='flex flex-col gap-2 '>
                <p className='text-richblack-5'>Date Of Birth</p>
                <p className='text-richblack-200'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
            </div>

            </div>
        </div>
        
    </div>
  )
}

export default MyProfile