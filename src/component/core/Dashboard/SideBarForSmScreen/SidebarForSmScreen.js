import React, { useState } from 'react'
import {sidebarLinks} from "../../../../data/dashboard-links"
import { useSelector } from 'react-redux'
import SidebarLink from "../SidebarLink"
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../../common/ConfirmationModal'
import { useAuth } from '../../../../hooks/useAuth'

function Sidebar() {
    
    const {user, loading:profileLoading} = useSelector((state)=>state.auth);
    const { loading : authLoading} = useSelector((state)=>state.auth);
    const { logout } = useAuth();
    const [confirmationModal , setConfirmationModal] = useState(null);

    if(profileLoading || authLoading) {
        return (
            <div className='spinner'>

            </div>
        )
    }
    return (
        <>
        <div className=' h-[calc(100vh-3.5rem)] w-full flex-col border-r-[1px]  bg-richblack-900 py-10'>
        <div className='text-3xl text-richblack-25 px-8 md:mx-0 mx-2 py-2 mb-4'>Dashboard</div>
            <div className='flex flex-col w-full focus:bg-richblack-300'>
                {sidebarLinks.map((link)=>{
                        if (link.type && user?.accountType !== link.type) return null;
                        return <SidebarLink key={link.id} link={link} iconName = {link.icon}/>
                        })}
            </div>

            <div className="mx-auto my-4 h-[1px] w-10/12 bg-richblack-700" />

            <div className='flex flex-col'>
                <SidebarLink link={{name:"Settings", path:"/dashboard/settings"}} iconName="VscSettingsGear" />
                <button onClick={()=> {
                    setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: ()=> logout(),
                        btn2Handler: ()=> setConfirmationModal(null),
                    })
                }}
                className="px-8 py-2  mx-2 text-xl font-medium text-richblack-300">
                    <div className="flex items-center gap-x-2">
                    <VscSignOut className="" />
                    <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}

export default Sidebar