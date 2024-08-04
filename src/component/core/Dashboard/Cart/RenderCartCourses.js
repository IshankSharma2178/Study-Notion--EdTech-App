import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {removeFromCart} from "../../../../slices/cartSlice"
import { Navigate, useNavigate } from 'react-router';

function RenderCartCourses() {
    const {cart} =useSelector((state)=>state.cart);
    const dispatch =useDispatch()
    const navigate = useNavigate();
    const [loadng,setLoading] =useState(false);
    const [averageRatings, setAverageRatings] = useState({});




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


    useEffect(() => {
        const calculateAverageRatings = () => {
          const averages = {};
          cart.forEach((course) => {
            if (course.ratingAndReviews && course.ratingAndReviews.length > 0) {
              const totalRating = course.ratingAndReviews.reduce((acc, review) => acc + review.rating, 0);
              const averageRating = totalRating / course.ratingAndReviews.length;
              averages[course._id] = averageRating;
            } else {
              averages[course._id] = 0; 
            }
          });
          return averages;
        };
        setLoading(true);
        const avgRatings = calculateAverageRatings();
        setAverageRatings(avgRatings);
        setTimeout(() =>{
            setLoading(false);
        },10)
      }, []);

  return (
    <div  className="flex flex-1 flex-col w-[100%] lg:w-[70%]">
        {
            loadng?(<div className='spinner '></div>) : 
            (cart.map((course,index)=>{
                return <div key={course._id} className={`flex  w-[100%] flex-wrap items-start justify-between gap-6 ${index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"} ${index !== 0 && "mt-6"} `}>
                <div className="flex flex-1 flex-col gap-4 md:flex-row cursor-pointer" onClick={()=>navigate("/courses/"+ course._id)}>
                        <img src={course?.thumbnail} alt='course image' loading="lazy" className="h-[148px] w-[220px] rounded-lg object-cover"/>
                        <div className="flex flex-col space-y-1">
                            <p  className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                            <p className="text-sm text-richblack-300">{course?.Category?.name}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-5">4.8</span>
                                <ReactStars 
                                    count={5}
                                    size={20}
                                    value={averageRatings[course._id] || 0} 
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<GiNinjaStar />}
                                    fullIcon={<GiNinjaStar />}
                                />
                                {/* <span className="text-richblack-400">{course?.ratingAndReviews}{" "} Rating</span> */}

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <button   className="flex items-center gap-x-1 rounded-md  my-3 mx-[2px] text-pink-200"
                            onClick={()=>dispatch(removeFromCart(course._id))}
                        >
                            <RiDeleteBin6Line />
                            <span >Remove </span>
                        </button>
                        <p  className="mb-6 text-2xl font-medium text-yellow-100">{handlePrice(course?.price)}</p>
                    </div>
                </div>
            }))
        }
    </div>
  )
}

export default RenderCartCourses