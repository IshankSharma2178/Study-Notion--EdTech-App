import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Outlet } from "react-router-dom"
import Sidebar from "../component/core/Dashboard/Sidebar"

function Dashboard() {
     const {loading : profileLoading} =useSelector((state)=> state.profile)
     const {loading : authLoading} =useSelector((state)=> state.auth)

     if(authLoading || profileLoading) {
      return (
        <div className='spinner grid min-h-[calc(100vh-3.5rem)] place-items-cente'></div>
      )
     }

    return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] '>
      <Sidebar/>
      <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <Outlet/>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
