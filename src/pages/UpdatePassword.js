import {React , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

function UpdatePassword() {

    const dispatch = useDispatch();
    const location =useLocation();

    const {loading} =useSelector((state)=>state.auth)  
    const [passwordVisibility , setPasswordVisibility] =useState({password:true, confirmPassword:true})

    const [formData , setFormData] = useState({
        password:"",
        confirmPassword:"",
    })

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility(prev => ({
          ...prev,
          [field]: !prev[field]
        }));
      };
    
    function handleOnChange(e){
        const {name,value} = e.target
        setFormData((preData)=>(
           { 
            ...preData ,
            [name]:value
        }
        ))
    }
    const {password , confirmPassword}=formData;

    const handleOnSubmit = (e)=>{
        console.log("formData  :  " , password , confirmPassword)
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,confirmPassword ,token));
    }
  return (
    <div>
        {
            loading ? (
                <div className='spinner'></div>
            ) 
            :(
                <div className='text-white'>
                    <h1>Choose new password</h1>
                    <p>Almost done. Enter your new password and youre all set.</p>

                    <form onSubmit={handleOnSubmit}>
                    <label className="w-full relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Enter Password
                                    <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                value={formData.password}
                                type={togglePasswordVisibility.password ? 'password' : 'text'}
                                name="password"
                                placeholder="Enter Password"
                                onChange={handleOnChange}
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem]  outline-none bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                            />
                            <div className='absolute text-richblack-25 right-3 cursor-pointer -translate-y-9 text-2xl'
                                    onClick={()=>togglePasswordVisibility}>
                                {passwordVisibility.password===true? <AiOutlineEye/>:<AiOutlineEyeInvisible/>}
                            </div>
                        </label>

                        <label className="w-full relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Confirm Password
                                    <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                value={formData.confirmPassword}
                                type={togglePasswordVisibility.confirmPassword ? 'password' : 'text'}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleOnChange}
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem]  outline-none bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                            />
                            <div className='absolute text-richblack-25 right-3 cursor-pointer -translate-y-9 text-2xl'
                                    onClick={()=>togglePasswordVisibility}>
                                {passwordVisibility.confirmPassword===true? <AiOutlineEye/>:<AiOutlineEyeInvisible/>}
                            </div>
                        </label>

                        <button type="submit">
                                Reset Password
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

export default UpdatePassword