import React from 'react'
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
    const {token} = useSelector((state)=> state.auth)
    console.log("token : ",token)
    console.log("state : ",localStorage.getItem("token"));
  
    return (
    <div></div>
  )
}

export default Dashboard
