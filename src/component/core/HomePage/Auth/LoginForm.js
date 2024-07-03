import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

function LoginForm() {
  const [passwordVisibility , setPasswordVisibility] =useState({password:true, confirmPassword:true})
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


    function passwordfield(label,holder,k){
      return(
        <label className="w-full relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  {label}<sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    value={formData.k}
                    type={passwordVisibility[k]===true ? 'password' : 'text'}
                    name={k}
                    placeholder={holder}
                    onChange={changeHandler}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem]  outline-none bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                  />
                  <div className='absolute text-richblack-25 right-3 cursor-pointer -translate-y-9 text-2xl'
                        onClick={()=>togglePasswordVisibility(k)}>
                    {passwordVisibility[k]===true? <AiOutlineEye/>:<AiOutlineEyeInvisible/>}
                  </div>
                </label>
      )
    }
  
    function inputfield(label,holder,type,k){
      return (
        <>
          <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
           {label}<sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={type}
            onChange={changeHandler}
            name={k}
            placeholder={holder}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] outline-none bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        </>
      )
    }


    return (
      <form >
      <div className='mt-6  flex w-full flex-col gap-y-4'>
          <div >
            {inputfield("Email Address","Enter Email Address","email","email")}
          </div>
          <div >
            {passwordfield("Password","Enter Password","password")}
              <div className='text-[rgb(71,165,197)] text-right mt-1 cursor-pointer text-[15px] '>  
                 Forgot Password
              </div>
          </div>

          <button
          type="submit"
          className={`text-center text-[20px] font-medium mt-4 text-nowrap px-5 py-2 rounded-md bg-yellow-50 w-full text-richblack-900 
                        shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200 `}>
          Sign In
        </button>
      </div>
      </form>
  )
}

export default LoginForm