import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { fetchMarkedAsCompleted } from "../../../services/operations/courseDetailAPI"
import ProgressBar from '@ramonak/react-progress-bar'
import { useNavigate } from 'react-router'

function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [courseProgress, setCourseProgress] = useState({})

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token)
      setEnrolledCourses(response)
      const progress = {}
      
      // Calculate progress for each course
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
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={course._id}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
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
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
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
