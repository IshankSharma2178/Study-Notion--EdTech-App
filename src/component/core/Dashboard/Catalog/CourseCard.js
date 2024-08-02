import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../../utils/avgRating';

function CourseCard({ course, Height }) {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    console.log(course)
        
    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
        console.log(course);
    }, [course]);

    return (
        <div className='bg-richblack-800 border border-richblack-500  rounded-xl'>
            <Link to={`/courses/${course._id}`}> 
                <div>
                    <div>
                        <img src={course?.thumbnail} alt="Course image" className={`${Height} w-full  rounded-3xl object-cover  p-2`} />
                    </div>
                    <div className="flex flex-col gap-2 px-4 py-5">
                        <p  className="text-xl text-richblack-5">{course?.courseName}</p>
                        <p className="text-sm text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className="flex items-center gap-2">
                            <span  className="text-yellow-5">{avgReviewCount || 0}</span>
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
