import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router';

function EnrolledCourses() {

  const {token}  = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState([]);


  const getEnrolledCourses = async() => {
      try{
          const response = await getUserEnrolledCourses(token);
          setEnrolledCourses(response);
      }
      catch(error) {
          console.log("Unable to Fetch Enrolled Courses");
      }
  }

  useEffect(()=> {
    getEnrolledCourses();
  },[]);


  return (
    <div>
        <div>
          Enrolled Courses
        </div>
        {
          !enrolledCourses ?(<div className='spinner m-auto '></div>):
            enrolledCourses.length ?(<div>You have not enrolled in any courses yet.</div>):
              (
                <div>
                  <div>
                    <p>Courses Name</p>
                    <p>Duration</p>
                    <p>Progress</p>
                  </div>
                  {/* Cards  */}
                  {
                    enrolledCourses.map((course, index) =>(
                       <div>
                          <div>
                            <img src={course?.thumbnail}/>
                            <div>
                              <p>{course?.courseName}</p>
                              <p>{course?.courseDurtaion}</p>
                            </div>
                          </div>

                          <div>
                            {course?.totalDuration}
                          </div>

                          <div>
                            <p>Progress: {course?.progressPercentage || 0}</p>
                            <ProgressBar
                                completed={course.progressPercentage || 0}
                                height='8px'
                                isLabelVisible={false}
                            />
                          </div>
                      </div>
                    ))
                  }
                </div>
              )
        }
        
    </div>
  )
}

export default EnrolledCourses