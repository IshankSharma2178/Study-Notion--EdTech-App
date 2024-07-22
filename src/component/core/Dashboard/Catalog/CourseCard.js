import GetAvgRating from '@/src/utils/avgRating';
import React, { useEffect, useState } from 'react'

function CourseCard({course,height}) {

    const [avgReviewCount,setAvgReviewCount] = useState(0);
    
    useEffect(() =>{
        const count = GetAvgRating()
    },[course]);

  return (
    <div>
        <Link to={`/courses/${course._id  }`}>
            <div>
                <div>
                    <img src={course?.thumbnail} alt="Course image" className={`${height} w-full rounded-xl object-cover`}/>
                </div>
                <div>
                    <p>{course?.courseName}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div>
                        <span></span>
                        <span></span>
                    </div>
                    <p></p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CourseCard