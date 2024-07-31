import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { fetchMarkedAsCompleted } from "../../../services/operations/courseDetailAPI"
import ProgressBar from '@ramonak/react-progress-bar'
import { useNavigate } from 'react-router'
import IconBtn from '../../common/IconBtn'

function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [courseProgress, setCourseProgress] = useState({})

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token)
      setEnrolledCourses(response)
      console.log("bcd",response)
      const progress = {}
      
      // Calculate progress for each course
      // if(localStorage.getItem("courseProgress") === null || localStorage.getItem("courseProgress") !== enrolledCourses.length) {
        for (const course of response) {
        try {
          const completedLectures = await fetchMarkedAsCompleted({ courseId: course._id }, token)
          let count = 0
          for (const section of course.courseContent) {
              console.log(section)
              count += section.subSection.length
            }
          
          const percentage = ((completedLectures.length / count) * 100).toFixed(0)
          console.log("peerCount = " , percentage)
          progress[course._id] = percentage

          
          localStorage.setItem("courseProgress",JSON.stringify( progress))
        } catch (error) {
          console.log(`Error fetching progress for course ${course._id}:`, error)
        }
      }
      setCourseProgress(progress)
    } catch (error) {
      console.log("Unable to Fetch Enrolled Courses", error)
    }
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [token])

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className=" h-[30vh] w-full place-content-center text-2xl flex flex-col items-center text-richblack-50 gap-5">
          You have not enrolled in any course yet.
          <IconBtn text={"Buy Course"}  onClick={()=>navigate("/catalog/web-dev")} />
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500  ">
            <p className="w-[45%] px-5 py-3 text-left ">Course Name</p>
            {/* <p className="w-1/4 px-2 py-3">Instructor Name</p> */}
            {/* <p className="flex-1 px-2 py-3 text-end  mr-16">Progress</p> */}
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700  md:justify-normal justify-between ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={course._id}
             >
              <div
                className="md:flex hidden w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
               >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.description?.length > 50
                      ? `${course.description.slice(0, 50)}...`
                      : course.description}
                  </p>
                </div>
              </div>

              {/* for small screens */}
              <div
                className="flex md:hidden w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.description?.length > 50
                      ? `${course.description.slice(0, 50)}...`
                      : course.description}
                  </p>
                </div>
              </div>
              
              {/* <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div> */}
              <div className="flex w-9/20 md:w-1/5  flex-col gap-2 px-2 py-3">
                <p>Progress: {courseProgress[course._id] || 0}%</p>
                <ProgressBar
                  completed={courseProgress[course._id] || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default EnrolledCourses
