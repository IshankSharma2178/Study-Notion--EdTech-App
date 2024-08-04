import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component"
import { FaStar } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
import {getAllRating} from "../../services/operations/courseDetailAPI"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'

function ReviewSlider() {
    const [ratings , setRatings] = useState([]);

    useEffect(()=>{
        const getRatings = async()=>{
            setRatings(await getAllRating());
        }
        getRatings();
    },[])


  return (
    <div className="text-white m-auto">
    <div className="my-[50px] m-auto h-[184px] max-w-maxContentTab lg:max-w-maxContent">
      <Swiper
        slidesPerView={1}
        spaceBetween={25}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        breakpoints={{
              1024: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 3,
              },
              400: {
                slidesPerView: 2,
              },
              100:{
                slidesPerView: 1,
              }
            }}
        
        modules={[FreeMode, Pagination, Autoplay]}
        className="w-full "
      >
        {ratings?.map((review, i) => {
          return (
            <SwiperSlide key={i}>
              <div className=" flex flex-col gap-3 rounded-md bg-richblack-800 h-[177px] p-3 text-[14px] text-richblack-25">
                <div className="flex items-center gap-4">
                  <img
                    loading="lazy"
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="text-[12px] font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>
                <p className="font-medium text-richblack-25">
                  {review?.review.split(" ").length > 15
                    ? `${review?.review
                        .split(" ")
                        .slice(0, 15)
                        .join(" ")} ...`
                    : `${review?.review}`}
                </p>
                <div className="flex items-center gap-2 ">
                  <h3 className="font-semibold text-yellow-100">
                    {review.rating.toFixed(1)}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          )
        })}
        {/* <SwiperSlide>Slide 1</SwiperSlide> */}
      </Swiper>
    </div>
  </div>
)
}

export default ReviewSlider