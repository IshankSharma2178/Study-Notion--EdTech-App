import React from 'react'
import { useSelector } from 'react-redux'
import RenderTotalAmount from "./RenderTotalAmount"
import RenderCartCourses from "./RenderCartCourses"

function Cart() {

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
            (<div className="mt-14 text-center text-3xl text-richblack-100">Your Cart is Empty</div>)
        }
    </div>
  )
}

export default Cart