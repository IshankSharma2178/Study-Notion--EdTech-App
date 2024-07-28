const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

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
    console.log()

    if (!courseProgress) {
      return res.status(404).json({ error: "Course Progress does not exist" });
    }

    // Check if sub-section is already completed
    if (courseProgress.completedVideos.includes(subSectionId)) {
      return res.status(200).json({
        success: false,
        message: "Video already completed",
      });
    }

    // Update course progress
    courseProgress.completedVideos.push(subSectionId);
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
