import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from "../../services/operations/authAPI";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

function ProfileDropDown() {
    const storedUser = localStorage.getItem('user');
    const [isVisible, setIsVisible] = useState(false);
    const {user} = useSelector((state)=>state.auth)
    const divRef = useRef(null);  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-auto md:min-w-[180px]'>
            {user && (
                <div className='text-richblack-100 flex-row-reverse justify-start relative flex gap-3 flex-row items-center'>
                    <div onClick={() => setIsVisible(true)} className='flex flex-row gap-2 items-center justify-end'>
                        <img src={user.image} loading="lazy" alt="User Profile" className='aspect-square w-[30px] rounded-full object-cover' />
                        <AiOutlineCaretDown className={`md:block hidden ${isVisible ? "transform rotate-180 transition-transform duration-500" : "transform rotate-0 transition-transform duration-500"}`} />
                    </div>
                    {isVisible && (
                        <div ref={divRef} className='border-[1px] z-40 rounded-md flex flex-col border-richblack-700 bg-richblack-800 duration-300 translate-y-[10%] top-8 right-0 w-fit h-fit absolute'>
                            <NavLink to="/dashboard/my-profile" className='md:flex w-fit px-3 hidden h-10 hover:cursor-pointer flex-row items-center justify-center text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                                <VscDashboard className='mr-1' /> Dashboard
                            </NavLink>
                            <NavLink to="/dashboard" className='flex w-fit px-3 md:hidden h-10 hover:cursor-pointer flex-row items-center justify-center text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                                <VscDashboard className='mr-1' /> Dashboard
                            </NavLink>
                            <hr className='border-1 border-richblack-700' />
                            <p className='flex px-3 w-full h-10 hover:cursor-pointer flex-row items-center justify-start text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25' onClick={() => {
                                dispatch(logout(navigate));
                                setIsVisible(false);
                            }}>
                                <VscSignOut className='mr-2' /> Log Out
                            </p>
                        </div>
                    )}
                    {
                        user.accountType === "Student" &&
                    <NavLink to="/dashboard/cart" onClick={(e) => e.stopPropagation()} className="relative cart-icon">
                        <IoCartOutline className='text-3xl font-bold text-richblack-200' />
                        <p className={`absolute -top-1 text-sm text-center right-0 rounded-full size-4 ${cart.length !==0 ? "bg-[rgb(8,255,65)]" : ""} text-black font-semibold cart-length`}>
                            {cart.length || null}
                        </p>
                    </NavLink>
                    }
                </div>
            )}
        </div>
    );
}

export default ProfileDropDown;
