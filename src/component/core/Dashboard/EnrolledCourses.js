import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUserEnrolledCourses } from "../../../hooks/useProfile";
import { useFullCourseDetails } from "../../../hooks/useCourses";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  setTotalNoOfLectures,
  setCompletedLectures,
  setEntireCourseData,
  setCourseSectionData,
} from "../../../slices/viewCourseSlice";
import { useNavigate } from "react-router";
import IconBtn from "../../common/IconBtn";
import { apiConnector } from "../../../services/apiconnector";
import { courseEndpoints } from "../../../services/apis";

const { GET_COMPLETION_API } = courseEndpoints;

function EnrolledCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: enrolledCourses, isLoading: coursesLoading } =
    useUserEnrolledCourses();
  const [courseProgress, setCourseProgress] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const { data: fullCourseData, isLoading: fullCourseLoading } =
    useFullCourseDetails(selectedCourseId);

  // Fetch progress for all enrolled courses
  useEffect(() => {
    const fetchProgress = async () => {
      if (!enrolledCourses || enrolledCourses.length === 0) return;

      const progress = {};
      const token = localStorage.getItem("token");
      if (!token) return;

      for (const course of enrolledCourses) {
        try {
          const response = await apiConnector(
            "POST",
            GET_COMPLETION_API,
            { courseId: course._id },
            {
              Authorization: `Bearer ${JSON.parse(token)}`,
            }
          );

          if (response.data.message) {
            const completedLectures = response.data.courseProgress || [];
            let count = 0;
            for (const section of course.courseContent) {
              count += section.subSection.length;
            }

            const percentage =
              count > 0
                ? ((completedLectures.length / count) * 100).toFixed(0)
                : 0;
            progress[course._id] = percentage;
          }
        } catch (error) {
          console.log(
            `Error fetching progress for course ${course._id}:`,
            error
          );
        }
      }

      setCourseProgress(progress);
      localStorage.setItem("courseProgress", JSON.stringify(progress));
    };

    fetchProgress();
  }, [enrolledCourses]);

  // Handle course click and navigation
  useEffect(() => {
    if (fullCourseData && selectedCourseId) {
      dispatch(
        setCourseSectionData(fullCourseData.courseDetails.courseContent)
      );
      dispatch(setEntireCourseData(fullCourseData.courseDetails));
      dispatch(setCompletedLectures(fullCourseData.courseProgress || []));

      let lectures = 0;
      fullCourseData?.courseDetails.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));

      const course = enrolledCourses?.find((c) => c._id === selectedCourseId);
      if (course) {
        navigate(
          `/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
        );
      }
      setSelectedCourseId(null);
    }
  }, [fullCourseData, selectedCourseId, dispatch, navigate, enrolledCourses]);

  const courseHandler = (courseClicked) => {
    setSelectedCourseId(courseClicked._id);
  };

  const loading = coursesLoading || fullCourseLoading;

  if (loading) {
    return (
      <div className=" w-full  h-[calc(100vh-3.5rem)] m-auto">
        <div className="spinner"></div>
      </div>
    );
  } else
    return (
      <>
        <div className=" font-semibold text-3xl md:text-4xl text-richblack-50">
          Enrolled Courses
        </div>
        {!enrolledCourses ? (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        ) : !enrolledCourses.length ? (
          <p className=" h-[30vh] w-full place-content-center text-lg md:text-2xl flex flex-col items-center text-richblack-100 gap-5">
            You have not enrolled in any course yet.
            <IconBtn
              text={"Buy Course"}
              onClick={() => navigate("/catalog/web-devlopment")}
            />
            {/* TODO: Modify this Empty State */}
          </p>
        ) : (
          <div className="my-8 text-richblack-5">
            {/* Headings */}
            <div className="flex rounded-t-lg bg-richblack-500">
              <p className="w-[45%] px-5 py-3 text-left">Course Name</p>
              {/* <p className="w-1/4 px-2 py-3">Instructor Name</p> */}
              {/* <p className="flex-1 px-2 py-3 text-end mr-16">Progress</p> */}
            </div>
            {/* Course Names */}
            {enrolledCourses.map((course, i, arr) => (
              <div
                className={`flex items-center border border-richblack-700 md:justify-normal justify-between ${
                  i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
                key={course._id}
              >
                <div
                  className="md:flex hidden w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => courseHandler(course)}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    loading="lazy"
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
                    navigate(`/view-course/${course._id}`);
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    loading="lazy"
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
                <div className="flex w-9/20 md:w-1/5 flex-col gap-2 px-2 py-3">
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
    );
}

export default EnrolledCourses;
