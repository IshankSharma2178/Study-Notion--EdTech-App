import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

import ReactStars from "react-rating-stars-component";

function CourseCard({ course, Height }) {


    function CalculateStars(avgReviewCount){
        const totalratings = avgReviewCount.map((rating) =>rating.rating)
        return totalratings/avgReviewCount.length
    }
    


    return (
        <div className='bg-richblack-800 border border-richblack-500  rounded-xl'>
            <Link to={`/courses/${course._id}`}> 
                <div>
                    <div>
                        <img src={course?.thumbnail} loading="lazy" alt="Course image" className={` md:${Height} h-[250px] w-full  rounded-3xl object-cover  p-2`} />
                    </div>
                    <div className="flex flex-col gap-2 px-4 py-5">
                        <p  className="text-xl text-richblack-5">{course?.courseName}</p>
                        <p className="text-sm text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className="flex items-center gap-2 ">
                            <p className="text-yellow-5 pt-[4px] text-lg" >{CalculateStars(course?.ratingAndReviews)}</p>
                            <span  className="">{<ReactStars size= {30}    
                                                    emptyIcon={<far fa-star /> }
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    filledIcon={<FaStar />}
                                                    value={CalculateStars(course?.ratingAndReviews)} 
                                                    activeColor="#ffd700"
                                                    edit={false}/> || 0}
                            </span>
                            {/* <span>{course?.reviews?.length} Reviews</span> */}
                            <span  className="text-richblack-400">{course?.ratingAndReviews?.length} reviews</span>
                        </div>
                        <p  className="text-xl text-richblack-5">₹ {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CourseCard;
