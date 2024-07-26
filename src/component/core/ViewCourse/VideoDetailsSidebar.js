import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigation, useParams } from 'react-router';
import IconBtn from '../../common/IconBtn';

function VideoDetailsSidebar({setReviewModal}) {

    const [activeStatus ,setActiveStatus] = useState("");
    const [videobarActive ,setVideoBarActive ] = useState("" ); 
    const location = useLocation();
    const navigate = useNavigation();
    const {sectionId , subSectionId} = useParams();
    const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures} = useSelector((state)=>state.viewCourse);
    
    useEffect(()=>{
        const setActiveFlags =()=>{
            if(!courseSectionData.length)return;

            const currentSectionIndex = courseSectionData.findIndex((data)=>data._id === sectionId);
            const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data)=>data._id === subSectionId);
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id;
            setActiveStatus(courseSectionData[currentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId);
        }

        setActiveFlags()
        },[location.pathname,courseSectionData,courseEntireData])

  return (
    <div>
        {/* for button and headong */}
        <div>
            {/* for button */}
            <div>
                <div
                    onClick={()=>navigate("/dashboard/enrolled-courses")}
                >
                    Back
                </div>
                <div>
                    <IconBtn
                        text="Add Review" 
                        onClick={()=>setReviewModal(true)}
                        />
                </div>
            </div>
            {/* for heading and title */}
            <div >
                <p>{courseEntireData?.courseName}</p>
                <p>{completedLectures?.length} / {totalNoOfLectures}</p>
            </div>

        </div>
        {/*For Section and SubSection */}
        <div>
            {
                courseSectionData?.map((course,index)=>{
                    <div
                        onClick={()=> setActiveStatus(course?._id)}
                        key={index}
                    >
                        {/* Sections */}
                        <div>
                            <div>
                                {course?.sectionName}
                            </div>
                        </div>
                        {/* SubSection */}
                        <div>
                            {
                                activeStatus === course?._id && (
                                    <div>
                                        {
                                            course?.subSection.map((topic ,index)=>(
                                                <div
                                                    key={index}
                                                    onClick={()=>{navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`); setVideoBarActive(topic?._id);}}
                                                    className={`flex gap-3 p-5 ${videobarActive === topic._id?"bg-yellow-200 text-richblue-900":"bg-richblack-900 text-white"}`}
                                                >
                                                    <input 
                                                    type="Checkbox" 
                                                    checked={completedLectures.includes(topic._id)}
                                                    onClick={()=>{}}
                                                    />
                                                    <spna>
                                                        {topic.title}
                                                    </spna>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default VideoDetailsSidebar