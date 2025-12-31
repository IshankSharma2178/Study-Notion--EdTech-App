import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Navigation, Pagination } from "swiper/modules";

import CourseCard from "./CourseCard";

function CourseSlider({ Courses }) {
  const publishedCourses = Courses?.filter(
    (course) => course.status === "Published"
  );

  return (
    <>
      {publishedCourses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          navigation={true}
          modules={[FreeMode, Pagination, Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 1,
            },
          }}
          className="max-h-[30rem] md mySwiper "
        >
          {publishedCourses.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
}

export default CourseSlider;
