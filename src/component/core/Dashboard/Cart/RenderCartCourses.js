import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import removeFromCart from "../../../../services/operations/CartAPI"

function RenderCartCourses() {
    const {cart} =useSelector((state)=>state.cart);
    const dispatch =useDispatch()
    console.log("course details : ",cart);
    
    cart.map((course)=>{
        console.log("course  : ",course);
    })

    const handlePrice=(price)=>{
        if(price.length<=3){
            return price
        }
        return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(price);
    }

  return (
    <div  className="flex flex-1 flex-col w-[100%] lg:w-[70%]">
        {
            cart.map((course,index)=>{
                return <div key={course._id} className={`flex  w-[100%] flex-wrap items-start justify-between gap-6 ${index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"} ${index !== 0 && "mt-6"} `}>
                <div className="flex flex-1 flex-col gap-4 md:flex-row">
                        <img src={course?.thumbnail} alt='course image' className="h-[148px] w-[220px] rounded-lg object-cover"/>
                        <div className="flex flex-col space-y-1">
                            <p  className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                            <p className="text-sm text-richblack-300">{course?.Category?.name}</p>
                            <div className="flex items-center gap-2">
                                <spna className="text-yellow-5">4.8</spna>
                                <ReactStars 
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<GiNinjaStar />}
                                    fullIcon={<GiNinjaStar />}
                                />
                                <spna className="text-richblack-400">{course?.ratingAndReviews}{" "} Rating</spna>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <button   className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                            onClick={()=>dispatchEvent(removeFromCart(course._id))}
                        >
                            <RiDeleteBin6Line />
                            <spna>Remove</spna>
                        </button>
                        <p  className="mb-6 text-2xl font-medium text-yellow-100">{handlePrice(course?.price)}</p>
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default RenderCartCourses