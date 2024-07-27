import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
// import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart ,removeFromCart } from '../../../slices/cartSlice';
import { BiSolidRightArrow } from 'react-icons/bi';

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {
    const { cart } = useSelector((state) => state.cart)
    const {user} = useSelector((state)=>state.auth);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,

    } = course;
    
    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Instructor cannot buy the course")
            return
        }
        if (token) {
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2Text:"cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }
    const isAlreadyBuy = ()=>{
        if(user === null) return false;
        const coursesEnrolled = user.courses;
        for(const userCourse of coursesEnrolled ){
            if(userCourse === course._id)
                return true;
        }
        return false;
    }
    
    const handleShare = () => {
        // copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }

    function isCourseAddded(){
        if(localStorage.getItem("cart")){
            const cartItems=JSON.parse(localStorage.getItem("cart"));
            for (const cartCourse of cartItems) {
            if(cartCourse._id === course._id){
                return true;
            }
        }
        console.log("Course true",localStorage.getItem("cart")._id,course._id)
        return false;
    }
}

    const handleRemoveToCart = () => {
        dispatch(removeFromCart(course._id))
    }

    return (
        <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
        <img 
            src={ThumbnailImage}
            alt='Thumbnail Image'
            className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full'
        />
        <div className='px-4'>
        <div className='space-x-3 pb-4 text-3xl font-semibold'>
            Rs. {CurrentPrice}
        </div>
        <div className='flex flex-col gap-y-6'>
            <button className='yellowButton'
                onClick={
                    user && isAlreadyBuy()
                    ? ()=> navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                }
            >
                        {
                            isAlreadyBuy() ? (<button  >Go To Course</button>):
                        (<button onClick={()=>handleBuyCourse()}>Buy Now</button>)
                        }
            </button>
            
        {
            (!course?.studentsEnrolled?.includes(user?._id)) && (
                    isCourseAddded() ? (                      
                        <button onClick={handleRemoveToCart} className='blackButton'>
                            Remove From Cart
                        </button>):
                    (
                        <button onClick={handleAddToCart} className='blackButton'>
                            Add to Cart
                        </button>
                    )
            )
        }

        </div>

        <div>
            <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                30-Day Money-Back Guarantee
            </p> 
        </div>
        <div>
            <p className='my-2 text-xl font-semibold '>
                This Course Includes:
            </p>
            <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
                {
                    course?.instructions?.map((item, index)=> (
                        <p key={index} className='flex gap-2'>
                           <BiSolidRightArrow/>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
        </div>
        <div className='text-center'>
            <button
            className='mx-auto flex items-center gap-2 py-6 text-yellow-100 '
            onClick={handleShare}
            >
                Share
            </button>
        </div>
        </div>
    </div>
  )
}

export default CourseDetailsCard