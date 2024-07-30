import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, matchPath, NavLink } from 'react-router-dom';
import threeDot from "../../assets/Logo/threeDot.svg";
import { LuChevronFirst } from "react-icons/lu";
import { VscSignIn } from "react-icons/vsc";
import { GrLogin } from "react-icons/gr";
import { NavbarLinks } from "../../data/navbar-links";
import { RiHome4Line } from "react-icons/ri";
import { apiConnector } from "../../services/apiconnector";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { courseEndpoints } from "../../services/apis";
import { useLocation } from 'react-router-dom';
import { BsBook } from "react-icons/bs";
import { GrCatalogOption } from "react-icons/gr";
import { IoInformationCircleOutline } from 'react-icons/io5';
import LogoFullLight from "../../assets/Logo/LogoFullLight.png"

function Sidebar({ setShowSidebar, showSidebar }) {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const { totalItems } = useSelector((state) => state.cart);
    const [subLinks, setSubLinks] = useState([]);
    const location = useLocation();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", courseEndpoints.CATEGORIES_API);
            setSubLinks(result.data.Categorys);
        } catch (e) {
            console.log("could not fetch the category list");
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchSubLinks();
        setLoading(false);
    }, []);

    const matchRoute = (route) => {
        const matchRouteLink =  location.pathname;
        console.log("123",matchRouteLink ,route);
        return matchPath({ path: route }, matchRouteLink);
    };

    return (
        <div className={`fixed top-0 left-0 h-screen Sidebar-bg z-50 transition-transform duration-300  ease-in ${showSidebar ? "translate-x-0" : "-translate-x-full"} w-[65vw] bg-white text-black`}>
            <div className="flex flex-col h-full p-4">
                <div className="flex flex-row justify-between  items-center">
                    <img src={threeDot} alt="Logo" />

                    <button onClick={() => setShowSidebar(false)} className="text-lg">
                        <LuChevronFirst className={`text-white text-3xl ${showSidebar?"rotate-0 ":" rotate-180"} transition-all duration-100  `} />
                    </button>
                </div>

                { 
                    token !==null ?
                    (<div className='mt-6 flex flex-row justify-between gap-3  relative min-h-[100px]'>
                    <img src={user.image} alt="User" className="outline outline-richblack-600  p-1 w-14 h-14 rounded-full" />
                    <div className='size-[3px]  border-[6px] rounded-full absolute left-8 -top-2 translate-y-[50%] translate-x-[80%] border-[rgb(24,233,50)]'></div>
                    <div className='flex flex-col overflow-hidden'>
                        <p className='text-richblack-50 truncate'>{user.firstName}</p>
                        <p className='text-richblack-100 truncate'>{user.email}</p>
                    </div>
                </div>
                ):
                (
                    <div className='mt-2 flex flex-row justify-between gap-3 items-center relative min-h-[100px]'>
                        <img src={LogoFullLight} alt="Logo" className="w-fit h-fit " />

                    </div>
                )
                
                }
                
                <div className='flex flex-col gap-4'>
                    <NavLink to={NavbarLinks[0].path} onClick={() => setShow(false)}>
                        <div className={`flex rounded-md flex-row gap-4 items-center py-2 pl-3 ${!show && matchRoute(NavbarLinks[0].path) ? "bg-yellow-25 text-richblue-900 text-[17px]" : "text-[17px] text-richblack-25"}`}>
                            <RiHome4Line className="text-2xl font-bold" />
                            <p className='text-xl font-semibold'>
                                {NavbarLinks[0].title}
                            </p>
                        </div>
                    </NavLink>

                    <NavLink to={"/dashboard/enrolled-courses"} onClick={() => setShow(false)}>
                        <div className={`flex rounded-md flex-row gap-4 items-center py-2 pl-3 ${!show && matchRoute("/enrolled-courses") ? "bg-yellow-25 text-richblue-900 text-[17px]" : "text-[17px] text-richblack-25"}`}>
                            <BsBook  className="text-2xl font-bold" />
                            <p className='text-xl font-semibold'>
                                Enrolled Courses
                            </p>
                        </div>
                    </NavLink>

                    <div onClick={() => setShow(true)} className='flex flex-col'>
                        <div className={`flex rounded-md flex-row gap-4 items-center py-2 pl-3 ${show ? "bg-yellow-25 text-richblue-900 text-[17px]" : "text-[17px] text-richblack-25"}`}>
                            <GrCatalogOption className="font-bold text-2xl" />
                            <p className='text-xl font-semibold'>
                                {NavbarLinks[1].title}
                            </p>
                        </div>
                        <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${show ? 'max-h-[500px]' : 'max-h-0'}`} style={{ maxHeight: show ? '500px' : '0' }}>
                            {show && (
                                subLinks?.length ? (
                                    subLinks.map((sublink, index) => (
                                        <div>
                                            <NavLink
                                                onClick={()=>matchRoute("/catalog/"+sublink.name.split(" ").join("-").toLowerCase())}
                                                key={index}
                                            to={`catalog/${sublink.name.split(" ").join("-").toLowerCase()}`}
                                            className={`block rounded-lg py-4 pl-4 hover:bg-richblack-50 `}
                                         >
                                                <p className={`text-richblack-100 text-xl font-semibold pl-4 ${matchRoute("/catalog/"+sublink.name.split(" ").join("-").toLowerCase())?"text-yellow-5 bg-none":""} `}>{sublink.name}</p>
                                            </NavLink>
                                        </div>
                                    ))
                                ) : (
                                    <div></div>
                                )
                            )}
                        </div>
                    </div>
                    <NavLink to={NavbarLinks[2].path} onClick={() => setShow(false)}>
                        <div className={`rounded-md flex flex-row gap-4 items-center py-2 pl-3 ${!show && matchRoute(NavbarLinks[2].path) ? "bg-yellow-25 text-[17px]" : "text-[17px] text-richblack-25"}`}>
                            <IoInformationCircleOutline className="font-bold text-2xl" />
                            <p className='font-semibold text-xl'>
                                {NavbarLinks[2].title}
                            </p>
                        </div>
                    </NavLink>
                    <NavLink to={NavbarLinks[3].path} onClick={() => setShow(false)}>
                        <div className={`rounded-md flex flex-row gap-4 items-center py-2 pl-3 ${!show && matchRoute(NavbarLinks[3].path) ? "bg-yellow-25 text-[17px]" : "text-[17px] text-richblack-25"}`}>
                            <MdOutlinePermPhoneMsg className="font-bold text-2xl" />
                            <p className='font-semibold text-xl'>
                                {NavbarLinks[3].title}
                            </p>
                        </div>
                    </NavLink>
                    {
                        token === null &&(
                 
                  <NavLink to={"/signup"} onClick={() => setShow(false)}>
                        <div className={`flex rounded-md flex-row gap-4 items-center py-2 pl-3 ${!show && matchRoute("/signup") ? "bg-yellow-25 text-richblue-900 text-[17px]" : "text-[17px] text-richblack-25"}`}>
                            <VscSignIn   className="text-2xl font-bold" />
                            <p className='text-xl font-semibold'>
                                Sign Up
                            </p>
                        </div>
                    </NavLink>

                )
              }
              {
                token === null && (
                    <NavLink to={"/login"} onClick={() => setShow(false)}>
                        <div className={`flex rounded-md flex-row gap-4 items-center py-2 pl-3 ${!show && matchRoute("/login") ? "bg-yellow-25 text-richblue-900 text-[17px]" : "text-[17px] text-richblack-25"}`}>
                            <GrLogin  className="text-2xl font-bold" />
                            <p className='text-xl font-semibold'>
                                Login
                            </p>
                        </div>
                    </NavLink>
                )
              }


                </div>
            </div>
        </div>
    );
}

export default Sidebar;