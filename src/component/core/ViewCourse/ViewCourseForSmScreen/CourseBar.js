import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { setTotalNoOfLectures ,setCompletedLectures ,setEntireCourseData ,setCourseSectionData} from '../../../../slices/viewCourseSlice';
import { SlCheck } from "react-icons/sl";
import {getFullDetailsOfCourse} from "../../../../services/operations/courseDetailAPI"
import { markLectureAsComplete, fetchMarkedAsCompleted } from "../../../../services/operations/courseDetailAPI";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import CourseReviewModal from '../CourseReviewModal';
import { CircularProgressbar ,buildStyles } from 'react-circular-progressbar';


function CourseBar() {
    const [activeStatus, setActiveStatus] = useState([]);
    const [videoBarActive, setVideoBarActive] = useState("");
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();
    const [reviewModal,setReviewModal] = useState(false);
    const location = useLocation();
    const [progress,setProgress] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const { sectionId, subSectionId } = useParams();
    const { courseSectionData, courseEntireData, totalNoOfLectures, completedLectures } = useSelector((state) => state.viewCourse);

    useEffect(()=>{
        const setCourseSpecififcDetails = async()=>{
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.courseProgress));
            let lectures =0;
            courseData?.courseDetails.courseContent?.forEach((sec)=>{
                lectures += sec.subSection.length;
            })
            dispatch(setTotalNoOfLectures(lectures));
            try {
                const storedProgress = JSON.parse(localStorage.getItem('courseProgress'));
                if (storedProgress && storedProgress[courseId]) {
                    setProgress(storedProgress[courseId]);
                } else {
                    console.log('No progress data found for courseId:', courseId);
                }
            } catch (error) {
                console.error('Error parsing course progress from localStorage:', error);
            }
        }
        setLoading(true);
        setCourseSpecififcDetails()
    },[])

    useEffect(() => {
        const setActiveFlags = () => {
            if (!courseSectionData.length) return;
            const currentSectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
            if (currentSectionIndex === -1 || !courseSectionData[currentSectionIndex].subSection) return;

            const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSec) => subSec._id === subSectionId);
            if (currentSubSectionIndex === -1) return;

            setActiveStatus((prevStatus) => {
                if (!prevStatus.includes(courseSectionData[currentSectionIndex]._id)) {
                    return [...prevStatus, courseSectionData[currentSectionIndex]._id];
                }
                return prevStatus;
            });
            setVideoBarActive(courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex]._id);


        };

        if (courseEntireData) {
            setActiveFlags();
        }
            setLoading(false)
    }, [courseSectionData, location.pathname, sectionId, subSectionId, courseEntireData, courseId]);


    const handleDropDown = (id) => {
        if (activeStatus.includes(id)) {
            setActiveStatus(activeStatus.filter(statusId => statusId !== id));
        } else {
            setActiveStatus([...activeStatus, id]);
        }
    };

    const handleAddReview = () => {
        setReviewModal(true);
    };

    return (
        <>
            {
                loading ? (<div className='spinner w-full h-full m-auto'></div>):
                (<div className="md:hidden  max-w-maxContent w-full  flex flex-col border-r-[1px] rounded-md border-r-richblack-700 min-h-[80vh] bg-richblack-800">
            {/* for buttons and headings */}
            <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                {/* for buttons */}
                <div className="flex w-full items-center justify-between">
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
                            text=" Review Course"
                            customClasses="ml-auto"
                            onClick={() => handleAddReview()}
                        />
                    </div>
                </div>
                {/* for heading or title */}
                </div>

                <div className='flex flex-row mx-5 my-4 items-end gap-4'>
                    <div className="flex flex-col">
                        <p className='text-xl text-richblack-5'>{courseEntireData?.courseName}</p>
                        <p className="text-sm font-semibold pt-2 text-[rgb(6,214,160)]">{completedLectures?.length || 0} / {totalNoOfLectures} Completed</p>
                    </div>
                    <p className='size-8'>
                        <CircularProgressbar
                            value={progress}
                            text={`${progress}%`}
                            styles={buildStyles({
                            textColor: "white",
                            pathTransitionDuration:2,
                            marginTop:8,
                            textSize:"1.5rem",
                            pathColor: "rgb(8, 191, 145)",
                            trailColor: "rgb(66, 72, 84)"
                            })}
                        />
                    </p>
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
                        <div className="flex flex-row justify-between rounded-md bg-richblack-600 mx-2 px-5 py-4">
                            <div className="w-[70%] font-semibold">
                                {course?.sectionName}
                            </div>
                            <div className="flex items-center gap-3">
                                <span
                                    className={`${activeStatus.includes(course?._id) ? "rotate-180" : "rotate-0"} transition-all duration-200`}
                                >
                                    <BsChevronDown />
                                </span>
                            </div>
                        </div>

                        {/* subSections */}
                        <div>
                            {activeStatus.includes(course?._id) && (
                                <div className='mt-1 md:mt-0'>
                                    {course?.subSection?.map((topic, index) => (
                                        <div
                                            className={`flex  mx-5 py-3 px-2 flex-row justify-between rounded-lg  items-center ${videoBarActive === topic._id ? "bg-yellow-200 font-semibold text-richblack-800" : " hover:bg-richblack-700 hover:border hover:border-richblack-500 text-yellow-25"}`}
                                            key={index}
                                            onClick={() => {
                                                navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`);
                                                setVideoBarActive(topic?._id);
                                            }}
                                        >
                                            <span className='truncate'>
                                                {topic.title}
                                            </span>
                                            {completedLectures.includes(topic._id) && <SlCheck className='text-[rgb(6,214,160)] font-bold' />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
        </div>)
            }
        </>
    );
}

export default CourseBar;
