import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from "../../../../hooks/useAuth"

function EditPassword() {
    const {handleSubmit , register ,formState:{errors}} =useForm()
    const { changePassword } = useAuth()

    const submitHandler = (data)=>{
        const {currentPassword , newPassword} =data;
        changePassword({ currentPassword, newPassword })
    }

  return (
    <form className='flex flex-col w-full md:w-[90%] m-auto gap-2' onSubmit={handleSubmit(submitHandler)} >
        <div className='flex flex-col  gap-6 text-white m-auto w-[100%]  bg-richblack-800 rounded-xl border border-richblack-600 p-6 '>
            <h1 className='text-2xl font-semibold '>
                Change Password
            </h1>


            <div className='flex md:flex-row flex-col  w-full gap-5'>
                <div className='flex flex-col w-full md:w-[50%] gap-1'>
                    <label htmlFor='currentPassword'>Enter Current Password</label>
                    <input 
                        type="text"
                        id="currentPassword"
                        name="currentPassword"
                        className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-700 focus:shadow-none  p-[12px] text-richblack-5"
                        {...register("currentPassword",{required:true})}
                    />
                {
                    errors.currentPassword && (
                        <spna className='text-pink-200 text-sm'>Enter Current Password</spna>
                    )
                }
                </div>
                <div className='flex flex-col w-full md:w-[50%] gap-1'>
                <label htmlFor='newPassword'>Enter New Password</label>
                    <input 
                        type="text"
                        id="newPassword"
                        name="newPassword"
                        className="w-full rounded-[0.5rem] outline-none shadow-custom bg-richblack-700 focus:shadow-none  p-[12px] text-richblack-5"
                        {...register("newPassword",{required:true})}
                    />
                {
                    errors.newPassword && (
                        <spna className='text-pink-200 text-sm'>Enter New Password</spna>
                    )
                }
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

export default EditPassword