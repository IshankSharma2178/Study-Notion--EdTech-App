import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import removeFromCart from "../../../../services/operations/CartAPI"

function RenderCartCourses() {
    const {cart} =useSelector((state)=>state.cart);
    const dispatch =useDispatch()
  return (
    <div>
        {
            cart.map((course,index)=>{
                <div>
                    <div>
                        <img src={course?.thumbnail}/>
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
                                <spna>4.8</spna>
                                <ReactStars 
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<GiNinjaStar />}
                                    fullIcon={<GiNinjaStar />}
                                />
                                <spna>{course?.ratingAndReviews}{" "} Rating</spna>

                            </div>
                        </div>
                    </div>
                    <div>
                        <button 
                            onClick={()=>dispatchEvent(removeFromCart(course._id))}
                        >
                            <RiDeleteBin6Line />
                            <spna>Remove</spna>
                        </button>
                        <p>Rs {course?.price}</p>
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default RenderCartCourses