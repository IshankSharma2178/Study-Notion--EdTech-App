import React from 'react'
import { useSelector } from 'react-redux'
import RenderTotalAmount from "./RenderTotalAmount"
import RenderCartCourses from "./RenderCartCourses"
import IconBtn from "../../../common/IconBtn"
import { useNavigate } from 'react-router'

function Cart() {
    const navigate =useNavigate()
    const {total , totalItems} =useSelector((state) => state.cart)

  return (
    <div className='text-white'>
        <h1  className="mb-4 text-4xl  font-semibold text-richblack-5">Your Cart</h1>
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in Cart</p>

        {total >0 ?
            (<div  className="mt-8 flex w-[100%] flex-col items-start gap-x-6 gap-y-6 lg:flex-row relative ">
                <RenderCartCourses />
                <RenderTotalAmount />
            </div>)
            :
            (
              <div className='flex items-center justify-center m-auto flex-col gap-5'> 
                <div className="mt-14 text-center text-3xl text-richblack-100">Your Cart is Empty </div>
                <IconBtn text={"Buy Courses"} active={true} onClick={()=>navigate("/catalog/javascript")}/>
              </div>
                )
        }
    </div>
  )
}

export default Cart