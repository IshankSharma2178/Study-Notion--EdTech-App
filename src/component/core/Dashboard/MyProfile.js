import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import IconBtn from '../../common/IconBtn';

function MyProfile() {
    const {userProfile} =useSelector((state)=>state.profile)
    console.log("+++ ",userProfile)
    const {user} = useSelector((state)=>state.auth)
    const navigate=useNavigate();
    console.log("userProfile => ",userProfile)

    return (
    <div className='text-white w-[90%] content-start gap-4 m-auto flex flex-col '>
        <h1 className='text-3xl font-semibold text-richblack-5 '>
            My Profile
        </h1>
        
        {/* Block 1 */}
        <div className=' flex-col md:gap-0 gap-4 md:flex-row flex items-center  bg-richblack-800 rounded-xl border border-richblack-600 p-6 justify-between'>  
            <div className='flex-col md:flex-row flex gap-3 md:gap-6 justify-center items-center'>
                <img 
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className='aspect-square w-[68px] rounded-full object-cover'
                />
                <div>
                    <p className='text-[18px] md:text-start  text-center'>{user?.firstName+" "+user?.lastName}</p>
                    <p className='text-richblack-300 text-[14px]'>{user?.email}</p>
                </div>
            </div>
            <IconBtn 
                icon="FiEdit"
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
                <IconBtn text="Edit" icon="FiEdit" onClick={(()=>{navigate("/dashboard/settings")})}/>
                
            </div>
            <div className='overflow-auto w-[90%] text-wrap text-richblack-200'>
                {
                    userProfile?.about ===null ? 
                    <div>
                        Write Something About Yourself
                    </div>
                    :
                    <div>
                        { userProfile?.about }
                    </div>
                }
            </div>
            
        </div>

        {/* Block 3 */}
        <div className='flex flex-col bg-richblack-800 gap-10 p-6 rounded-xl border border-richblack-600'>
            <div className='flex flex-row justify-between  items-center' >
                <p className='text-richblack-5 text-wrap text-[17px] tracking-wide' >Personal Details</p>
                <IconBtn text="Edit" icon="FiEdit" onClick={(()=>{navigate("/dashboard/settings")})}/>
            </div>

            <div className='grid grid-cols-2 grid-rows-2 gap-6'>
            <div className='flex flex-col gap-2 break-words'>
                <p className='text-richblack-500'>First Name</p>
                <p  className='text-richblack-25'>{user?.firstName}</p>
            </div>
            <div className='flex flex-col gap-2 break-words'>
                <p className='text-richblack-500'>Last Name</p>
                <p className='text-richblack-25'>{user?.lastName}</p>
            </div>
            <div className='flex flex-col gap-2 break-words '>
                <p className='text-richblack-500'>Email Address</p>
                <p className='text-richblack-25'>{user?.email}</p>
            </div>
            <div className='flex flex-col gap-2  break-words'>
                <p className='text-richblack-500'>Gender</p>
                <p className='text-richblack-25'>{user?.additionalDetails?.gender || "-"}</p>
            </div>
            <div className='flex flex-col gap-2  break-words'>
                <p className='text-richblack-500'>Contact Number</p>
                <p className='text-richblack-25'>{user?.additionalDetails?.contactNumber || "-"}</p>
            </div>
            <div className='flex flex-col gap-2  break-words'>
                <p className='text-richblack-500'>Date Of Birth</p>
                <p className='text-richblack-25'>{user?.additionalDetails?.dateOfBirth || "-"}</p>
            </div>

            </div>
        </div>
        
    </div>
  )
}

export default MyProfile