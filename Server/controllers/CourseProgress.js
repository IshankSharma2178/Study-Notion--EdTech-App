const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    // Check if sub-section exists
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({ error: "Invalid SubSection" });
    }

    // Check if course progress exists for user
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      return res.status(404).json({ error: "Course Progress does not exist" });
    }

    // Check if sub-section is already completed
    if (courseProgress.completedVideos.includes(subSectionId)) {
      return res.status(200).json({
        success: false,
        message: "Video already completed",
        courseProgress:   courseProgress.completedVideos
      });
    }

    // Update course progress
    courseProgress.completedVideos.push(subSectionId);
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully",
      courseProgress:   courseProgress.completedVideos
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchCompletedVideos = async(req,res)=>{
  try{
    const { courseId } = req.body;
    const userId = req.user.id;

    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Course Progress fetched Successfully",
      courseProgress:   courseProgress.completedVideos
    });


  }catch(error){
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.unMarkLectureProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    const courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found",
      });
    }
    courseProgress.completedVideos = courseProgress.completedVideos.filter(
      (videoId) => !videoId.equals(subSectionId)
    );

    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully",
      courseProgress: courseProgress,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

