import React from 'react'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useRef, useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { logout } from "../../services/operations/authAPI"
import { useDispatch } from 'react-redux';

function ProfileDropDown() {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);  
    const navigate =useNavigate()
    const dispatch = useDispatch()
  
    const handleClickOutside = (event) => {
        // Check if the click is outside of the divRef
        if (divRef.current && !divRef.current.contains(event.target)) {
        setIsVisible(false);
        }
    };

    useEffect(() => {
        // Add event listener to detect clicks outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        // Cleanup event listener on component unmount
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <div>
      {
        user &&
        <div onClick={() => setIsVisible(true)} className='text-richblack-100 relative'>
          <div className='flex flex-row gap-2 items-center justify-center'>
            <img src={user.image} alt="User Profile" className='aspect-square w-[30px] rounded-full object-cover' />
            {
            <AiOutlineCaretDown className={`${isVisible===true?"transform rotate-180 transition-transform duration-500" :"transform rotate-0 transition-transform duration-500" }  `}/>
            }
          </div>
          {
            isVisible &&
            <div   ref={divRef} className='border-[1px] z-40 rounded-md  flex flex-col border-richblack-700 bg-richblack-800 duration-300 translate-y-[10%] right-0 w-fit h-fit absolute'>
                <p className='flex w-fit px-3  h-10 hover:cursor-pointer flex-row items-center justify-center  text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                    <VscDashboard className='mr-1' /> Dashboard
                </p>
                <hr className='border-1 border-richblack-700'></hr>

                  <p className='flex  px-3  w-full h-10 hover:cursor-pointer flex-row items-center justify-start  text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'
                  onClick={()=>{dispatch(logout(navigate)) 
                      setIsVisible(false) }} >
                      <VscSignOut className='mr-2' /> Log Out
                  </p>

            </div>  
          }
        </div>
      }
    </div>
  )
}

export default ProfileDropDown
