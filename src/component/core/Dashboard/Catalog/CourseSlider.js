import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'

import CourseCard from './CourseCard'


function CourseSlider({Courses}) {
  return (
    <>
        {
            Courses?.length ? (
                <Swiper
                    slidesPerView={2}
                    spaceBetween={25}
                    loop={true}
                    navigation={true} 
                    modules={[FreeMode, Pagination, Navigation]}
                    breakpoints={{
                        1024: {
                        slidesPerView: 2,
                        },
                        768:{
                          slidesPerView: 2,
                        }

                    }}
                    className="max-h-[30rem] md mySwiper"
                >
                    {
                        Courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                                <CourseCard course={course} Height={"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>
            ) : (
                <p className="text-xl text-richblack-5">No Course Found</p>
            )

        }
    </>
  )
}


export default CourseSlider