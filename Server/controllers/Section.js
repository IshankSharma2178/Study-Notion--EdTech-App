const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "please enter all fields",
      });
    }
    //create section
    const newSection = await Section.create({ sectionName });

    //update course with section objectid
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    ///todo populate to replace section and subsection both in updated course details

    return res.status(200).json({
      success: true,
      message: "section created successfully",
      data: updatedCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "please enter all fields",
      });
    }

    //update data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName: sectionName },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "section updated successfully",
      data: section,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "please enter all fields",
      });
    }

    const response = await Course.findByIdAndUpdate(
      { _id: courseId },
      { $pull: { courseContent: sectionId } },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    const result = await Section.findByIdAndDelete({ _id: sectionId });

    return res.status(200).json({
      success: true,
      message: "section deleted successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
