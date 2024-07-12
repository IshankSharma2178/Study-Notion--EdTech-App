import React from 'react'
import { useDispatch } from 'react-redux'
import { matchPath, useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import * as VscIcons from "react-icons/vsc";
import * as Io5Icons from "react-icons/io5";

function SidebarLink({ link, iconName }) {
    const Icon = VscIcons[iconName] || Io5Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();
    
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <NavLink to={link.path} className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800" : " bg-opacity-0"}`}>
            <span className={`${matchRoute(link.path) ? "opacity-100" : "opacity-0"} absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50`}></span>

            <div className={`${matchRoute(link.path) ? "text-yellow-50" : ""} flex items-center text-richblack-300 gap-x-2`}>
                {Icon && <Icon className="text-lg" />}
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
}

export default SidebarLink;
