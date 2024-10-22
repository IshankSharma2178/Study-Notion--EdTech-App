import React, { useEffect, useState } from 'react';
import { Link, matchPath } from 'react-router-dom';
import logo from "../../assets/Logo/LogoFullLight.png";
import { NavbarLinks } from "../../data/navbar-links";
import { IoReorderThree } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "./ProfileDropDown";
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/apis';
import { IoIosArrowDown } from "react-icons/io";
import Sidebar from './Sidebar';

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", courseEndpoints.CATEGORIES_API);
      setSubLinks(result.data.Categorys || []);
    } catch (e) {
      console.log("could not fetch the category list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    const matchRouteLink = "/" + location.pathname.split("/")[1];
    return matchPath({ path: route }, matchRouteLink);
  };

 

  return (
    <div className='flex h-14 items-center justify-normal md:justify-center border-b-[1px] border-b-richblack-700 '>
      <div className=' md:hidden flex w-full'>
        <div className='flex flex-row justify-evenly  w-full items-center'>
          <button className='text-white' onClick={() => setShowSidebar(true)}>
            <IoReorderThree className='text-richblack-200 text-3xl' />
          </button>
          <Link to="/">
            <img loading="lazy" src={logo} width={190} height={48} alt="Logo" className='ml-5' />
          </Link>
          {
            token === null && (
              <Link to="/signup">
                <button className='border md:hidden block  border-richblack-700 bg-richblack-800 px-1 py-[8px] text-richblack-100 rounded-md   '>
                  Sign up
                </button>
              </Link>
            )
          }
          {
            token !== null &&
            <ProfileDropDown />
          }
        </div>
        <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      </div>

      <div className='md:flex w-11/12 max-w-maxContent items-center justify-between hidden'>
        <Link to="/">
          <img loading="lazy" src={logo} width={160} height={42} alt="Logo" />
        </Link>

        <nav>
          <ul className=' gap-x-6 text-richblack-25 md:flex hidden'>
            {
              NavbarLinks?.map((link, index) => (
                <li key={index}>
                  {
                    link.title === "Catalog" ?
                      <p className={`${matchRoute(link?.path) ? "text-yellow-25 text-[17px]" : "text-[17px] text-richblack-25"} flex relative flex-row group items-center gap-1 text-[17px] cursor-pointer`}>
                        {link.title}
                        <IoIosArrowDown className=' transition-all group-hover:rotate-180 duration-300 transform translate-all   ' />
                        <div className={`invisible absolute left-[50%] 
                                    translate-x-[-49%] ${subLinks.length ? "translate-y-[15%]" : "translate-y-[40%]"}
                                 top-[60%] z-50 
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 w-[250px] lg:w-[300px]`}>
                          <div className={`absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5`}>
                          </div>
                          {
                            subLinks.length > 0 ? (
                              subLinks.map((sublink, index) => {
                                return (
                                  <Link
                                    className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'
                                    to={`catalog/${sublink.name.split(" ").join("-").toLowerCase()}`}
                                    key={index}
                                  >
                                    <p>{sublink.name}</p>
                                  </Link>
                                );
                              })
                            ) : (
                              <div className='spinner2'></div>
                            )
                          }
                        </div>
                      </p>
                      :
                      (<Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? "text-yellow-25 text-[17px]" : "text-[17px] text-richblack-25"}`}>
                          {link.title}
                        </p>
                      </Link>
                      )
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        {/* login / signup/ dashboard button */}

        <div className='flex flex-row'>
          {
            user && user?.accountType !== "Instuctor" && (
              <Link to="dashboard/cart" className='relative'>
                <AiOutlineShoppingCart />
                {
                  totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/login">
                <button className='border md:block hidden border-richblack-700 bg-richblack-800 px-4 py-[8px] text-richblack-100 rounded-md  mr-4 '>
                  Log in
                </button>
              </Link>

            )
          }
          {
            token === null && (<Link to="/signup">
              <button className='border md:block hidden border-richblack-700 bg-richblack-800 px-4 py-[8px] text-richblack-100 rounded-md   '>
                Sign up
              </button>
            </Link>
            )
          }
          {
            token !== null &&

            <ProfileDropDown />
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar;
