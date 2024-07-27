import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router'
import { markLectureAsComplete } from "../../../services/operations/courseDetailAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from '../../common/IconBtn';
import ReactPlayer from 'react-player';

function VideoDetails() {

  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLecture } = useSelector((state) => state.viewCourse)
  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) navigate("/dashboard/enrolled-courses");
      else {
        const filteredData = courseSectionData.filter((course) => course._id === sectionId)
        const filteredVideo = filteredData?.[0].subSection.filter((data) => data._id === subSectionId);
        setPreviewSource(courseEntireData.thumbnail)
        setVideoData(filteredVideo[0]);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails()
  }, [location.pathname, courseSectionData, courseEntireData])


  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
    return currentSubSectionIndex === 0 && currentSectionIndex === 0;
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    return currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1;
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex != 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token);
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-0 text-white">
      {
        !videoData ? (<img
          src={previewSource}
          alt="Preview"
          className="h-[56.25vw] w-full rounded-md object-cover" // Adjust height for 16:9 ratio
        />)
          : (
            <div className='relative  w-full h-[400px]'>
              <ReactPlayer
                ref={playerRef}
                className="absolute top-0 aspect-[16/9] m-auto  w-full h-full"
                url={videoData?.videoUrl}
                controls
                onEnded={() => setVideoEnded(true)}
              />
              {
                videoEnded && (
                  <div style={{
                    backgroundImage:
                      "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                  }}
                    className="absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                  >
                    {
                      !completedLecture?.includes(subSectionId) && (
                        <IconBtn
                          disabled={loading}
                          onClick={() => handleLectureCompletion()}
                          text={!loading ? "Mark As Completed" : "Loading..."}
                          customClasses="text-xl max-w-max px-4 mx-auto"
                        />
                      )
                    }

                    <IconBtn
                      disabled={loading}
                      onClick={() => {
                        if (playerRef?.current) {
                          playerRef.current.seekTo(0);
                          setVideoEnded(false);
                        }
                      }}
                      text="Rewatch"
                      customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                    />

                    <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className='blackButton'
                        >
                          Prev
                        </button>
                      )}
                      {!isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className='blackButton'>
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                )
              }
            </div>
          )
      }
      <h1 className="mt-2 text-3xl font-semibold">
        {videoData?.title}
      </h1>
      <p className="pt-0 pb-6">
        {videoData?.description}
      </p>
    </div>
  )
}

export default VideoDetails
