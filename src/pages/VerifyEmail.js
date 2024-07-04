import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router';
import { sendOtp } from '../services/operations/authAPI';
import { useState , useEffect } from 'react';
import {signUp} from "../services/operations/authAPI"
import { Link } from 'react-router-dom';

function VerifyEmail() {

    const {signupData , loading} =useSelector((state) => state.auth)
    const dispatch= useDispatch();
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    })

    const  handleOnChange=(e)=>{
        e.preventDefault();
        const {accountType,firstName,lastName,email,password,confirmPassword} = signupData
        dispatch (signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
    }

    return (
        <div>
            {
                loading ?
               ( <div className="spinner"></div>)
                :
                (
                    <div className='text-white'>
                        <p>Verify Email</p>
                        <p>A verification code has been sent to you. Enter the code below</p>
                        <form onSubmit={handleOnChange}>
                            <OtpInput
                                 value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                             />
                             <button type='submit'>
                                    Verify Email
                             </button>
                        </form>

                        <div>
                            <Link to="/login">
                                <p>
                                    Back To Login
                                </p>
                            </Link>
                        </div>

                        <div>
                        <button onClick={()=>dispatch(sendOtp(signupData.email))}>
                            Resend it
                        </button>
                        </div>
                    </div>
                )
            }

        </div>
  )
}

export default VerifyEmail