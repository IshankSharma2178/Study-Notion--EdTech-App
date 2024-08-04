import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router';
import { sendOtp } from '../services/operations/authAPI';
import { useState , useEffect } from 'react';
import {signUp} from "../services/operations/authAPI"
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import {setUser} from "../slices/authSlice"
import { RxCountdownTimer } from "react-icons/rx";

function VerifyEmail() {

    const {user , loading} =useSelector((state) => state.auth)
    const dispatch= useDispatch();
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate("/signup");
        }
    })

    const  handleOnChange=(e)=>{
        e.preventDefault();
        const {accountType,firstName,lastName,email,password,confirmPassword} = user
        dispatch (signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
    }

    return (
        <div className='min-h-[calc(100vh-5rem)] grid place-items-center '>
            {                    

                loading ?
               ( <div className="spinner "></div>)
                :
                (
                        <div className='lg:max-w-[500px] max-w-[25rem] md:max-w-[400px] p-4 lg:p-8'>

                        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                            Verify Email
                        </h1>
                        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                            A verification code has been sent to you. Enter the code below
                        </p>
                        <form onSubmit={handleOnChange}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => (<input {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="md:w-[45px] w-[40px]  lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                    />
                                    )}
                                    containerStyle={{
                                        justifyContent: "space-between",
                                        gap: "0 6px",
                                    }}
                                />
                             <button type='submit'
                              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                                    Verify Email
                             </button>
                        </form>
                        <div className='flex flex-row justify-between mt-6 '>
                            <div className='flex items-center justify-between'>
                                <Link to="/signup">
                                    <button onClick={()=>dispatch(setUser(null))}  className="text-richblack-5 flex items-center gap-x-2">
                                        <BiArrowBack /> Back To Signup
                                    </button>
                                </Link>
                            </div>

                            <div>
                            <button onClick={()=>dispatch(sendOtp(user.email))}
                            className="flex items-center text-blue-100 gap-x-2">
                                <RxCountdownTimer /> Resend it
                            </button>
                            </div>
                        </div>
                        </div>
                )
            }

        </div>
  )
}

export default VerifyEmail