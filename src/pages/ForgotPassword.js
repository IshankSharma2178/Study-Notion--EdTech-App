import {React,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getPasswordResetToken} from "../services/operations/authAPI"

function ForgotPassword() {
  
  const [emailSent ,setEmailSent] =useState(false);
  const [email,setEmail] = useState("");
  const {loading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));
  }


    return (
    <div className='text-white flex justify-center m-auto items-center w-11/12 max-w-maxContent'>
        {
          loading ?(
                <div className='spinner'></div>
            ):(
                <div>
                  <h1>
                    {
                      !emailSent ? "Reset your Password" : "Check Your Email"
                    }
                  </h1>
                  <p>
                    {
                      !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":<div>{`We have sent the reset email to ${email}`}</div>
                    }
                  </p>
                  <form onSubmit={handleOnSubmit}>
                    {
                      !emailSent &&  (
                        <label>
                          <p>Email Address*</p>
                          <input 
                            required
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)} 
                            placeholder='Enter Your Email Address'
                          />
                        </label>
                      )
                    }

                    <button
                      type='submit'>
                      {
                        !emailSent ? "Reset Password" : "Resend Email"
                      }
                    </button>
                  </form>

                  <div>
                    <Link to="/login">
                      <p>Back to login</p>
                    </Link>
                  </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword