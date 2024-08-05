import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { markLectureAsComplete ,unMarkLectureProgress } from "../../../../services/operations/courseDetailAPI";
import { updateCompletedLectures,unCompleteLectureProgress ,setCompletedLectures} from "../../../../slices/viewCourseSlice";
import IconBtn from '../../../common/IconBtn';
import ReactPlayer from 'react-player';
import { Player } from 'video-react';
import Description from "./Description"
import 'video-react/dist/video-react.css';
import Comment from "./Comment"
import Rating from "./Rating"

function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [option,setOption] = useState("Description");

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) navigate("/dashboard/enrolled-courses");
      else {
        const filteredData = courseSectionData.filter((course) => course._id === sectionId);
        const filteredVideo = filteredData[0]?.subSection.filter((data) => data._id === subSectionId);
        setPreviewSource(courseEntireData?.thumbnail);
        setVideoData(filteredVideo[0]);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  }, [location.pathname, courseSectionData, courseEntireData]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((data) => data._id === subSectionId);
    return currentSubSectionIndex === 0 && currentSectionIndex === 0;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex((data) => data._id === sectionId);
    const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection?.length;
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((data) => data._id === subSectionId);
    return currentSectionIndex === courseSectionData?.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1;
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex((data) => data._id === sectionId);
    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex((data) => data._id === sectionId);
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  };
  

  const handleLectureCompletion = async () => {

    setLoading(true);

    if(!completedLectures?.includes(subSectionId)){
      const res = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token);
      dispatch(updateCompletedLectures(subSectionId));

    }else{
      const res = await unMarkLectureProgress({courseId: courseId, subSectionId: subSectionId }, token);
      dispatch(unCompleteLectureProgress(subSectionId))


    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-0 text-white">
      {
        !videoData ? (<img
          src={previewSource}
          loading="lazy"
          alt="Preview"
          className="h-[56.25vw] w-full rounded-md object-cover"
        />)
          : (
            <div className='flex flex-col gap-6 my-4 mt-6'>
              <div className='flex flex-row justify-between items-center border-b border-richblack-600'>
                <h1 className=" text-lg  md:text-3xl truncate text-richblack-5 font-semibold">
                  {videoData?.title}
                </h1>
                {
                    (
                      <div className="h-full place-content-center font-inter">
                        {
                           (
                            <div className='flex justify-center items-center flex-row-reverse gap-2'>
                            <label htmlFor='markAsCompleted'>Mark As completed</label>
                            <input 
                              id='markAsCompleted'
                              type='checkbox'
                              disabled={loading}
                              checked={completedLectures?.includes(subSectionId)}
                              onClick={() => handleLectureCompletion()}
                              className= {`${videoEnded ? "text-richblack-50":"text-richblack-200"} text-xl max-w-max px-4 mx-auto`}
                            />
                            </div>
                          )
                        } 
                      </div>
                    )
                  }
              </div>
              <div className='flex flex-col'>
                <div className='aspect-video  '>
                  <Player
                      ref = {playerRef}
                      aspectRatio="16:9"
                      playsInline="true"
                      onEnded={() => setVideoEnded(true)}
                      src={videoData?.videoUrl}
                      ></Player>
                        
                </div>

                <div className={`mt-6 flex min-w-[250px] gap-x-4 text-xl ${!isFirstVideo() ? 'justify-between' : 'justify-end'}`}>
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className='bg-yellow-50 px-[15px] md:flex hidden py-[4px] rounded-lg font-semibold text-richblack-900 hover:scale-95 transition-all duration-200 '
                    >
                      Prev
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className='bg-yellow-50 md:flex hidden px-[15px] py-[4px] rounded-lg font-semibold text-richblack-800 '
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
      }
      <div className='flex flex-col min-h-[200px]'>
        <div className='flex flex-row justify-start items-start gap-3 border-b border-b-richblack-600 pb-3'>
          <button 
            onClick={()=>setOption("Description")}
            className={`${option==="Description"?"text-yellow-5 border-b border-b-yellow-5":"text-richblack-100 "} `}
          >
            Description
          </button>
          <button
            onClick={()=>setOption("Comment")}
            className={`${option==="Comment"?"text-yellow-5 border-b border-b-yellow-5":"text-richblack-100 "} `}
          >
            Comment
          </button>
        </div>
        <div>
          {
            option === "Description" && <Description description={videoData.description}></Description> || 
            option === "Comment" && <Comment subSectionId={subSectionId}></Comment> || 
            option === "Rating" && <Rating></Rating>
          }
        </div>
      </div>
    </div>
  )
}

export default VideoDetails;
