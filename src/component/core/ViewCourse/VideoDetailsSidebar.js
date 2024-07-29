import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { SlCheck } from "react-icons/sl";
import {markLectureAsComplete ,fetchMarkedAsCompleted} from "../../../services/operations/courseDetailAPI"
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../../../slices/viewCourseSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState([]);
  const [videoBarActive, setVideoBarActive] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { sectionId, subSectionId } = useParams();
  const { courseSectionData, courseEntireData, totalNoOfLectures, completedLectures } = useSelector((state) => state.viewCourse);

  console.log("activeState : ", activeStatus);

  useEffect(() => {
      const setActiveFlags = () => {
          if (!courseSectionData.length) return;
          const currentSectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
          const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex((subSec) => subSec._id === subSectionId);

          setActiveStatus(prevStatus => {
              if (!prevStatus.includes(courseSectionData?.[currentSectionIndex]?._id)) {
                  return [...prevStatus, courseSectionData?.[currentSectionIndex]?._id];
              }
              return prevStatus;
          });
          setVideoBarActive(courseSectionData?.[currentSectionIndex].subSection?.[currentSubSectionIndex]?._id);
      };

      setActiveFlags();
  }, [courseSectionData, location.pathname, sectionId, subSectionId]);



  const handleAddReview = () => {
      setReviewModal(true);
  };

  const handleDropDown = (id) => {
      if (activeStatus.includes(id)) {
          setActiveStatus(activeStatus.filter(statusId => statusId !== id));
      } else {
          setActiveStatus([...activeStatus, id]);
      }
  };

  return (
    <div className="lg:flex h-[calc(100vh-3.5rem)] w-[230px] max-w-[300px] hidden  flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
      {/* for buttons and headings */}
      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
        {/* for buttons */}
        <div className="flex w-full items-center justify-between ">
          <div
            onClick={() => {
              navigate("/dashboard/enrolled-courses");
            }}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            title="back"
          >
            <IoIosArrowBack size={30} />
          </div>

          <div className=''>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onClick={() => handleAddReview()}
            />
          </div>
        </div>
        {/* for heading or title */}
        <div className="flex flex-col">
          <p className='text-md'>{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold pt-2 text-[rgb(6,214,160)] ">{completedLectures?.length || 0} / {totalNoOfLectures} Completed</p>
        </div>
      </div>

      {/* for sections and subSections */}
      <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
        {courseSectionData?.map((course, index) => (
          <div
            className="mt-2 cursor-pointer text-sm text-richblack-5"
            onClick={() => handleDropDown(course._id)}
            key={index}
          >
            {/* section */}
            <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
              <div className="w-[70%] font-semibold">
                {course?.sectionName}
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`${
                    activeStatus.includes(course?._id)
                      ? "rotate-180"
                      : "rotate-0"
                  } transition-all duration-200`}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {/* subSections */}
            <div>
              {activeStatus.includes(course?._id) && (
                <div>
                  {course?.subSection?.map((topic, index) => (
                    <div
                      className={`flex gap-3 px-5 py-2 flex-row justify-between items-center ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      }`}
                      key={index}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        );
                        setVideoBarActive(topic?._id);
                      }}
                    >
                      <span>
                        {topic.title}
                      </span>
                      {
                        completedLectures.includes(topic._id) &&
                          <SlCheck className='text-[rgb(6,214,160)] font-bold '/>
                        }
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoDetailsSidebar;
