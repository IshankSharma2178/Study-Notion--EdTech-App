import React from 'react'
import { useSelector } from 'react-redux'

function ForgotPassword() {
  const {laoding} = useSelector((state)=>state.auth);
    return (
    <div>
        (
            loading ?(
                <div className='.spinner'></div>
            ):(
                <div></div>
            )
        )
    </div>
  )
}

export default ForgotPassword