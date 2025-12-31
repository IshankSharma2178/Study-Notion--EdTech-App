const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const User = require("../models/User");
const Comments = require("../models/Comments");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

async function uploadVideoToCloudinary(video) {
  const folder = "codehelp";
  const option = {};
  option.resource_type = "auto";
  option.folder = folder;

  return cloudinary.uploader.upload_stream(video.tempFilePath, option);
}

exports.createSubSection = async (req, res) => {
  try {
    //fetch data from req body
    const { sectionId, title, timeDuration, description, courseId } = req.body;

    //extract file/video
    const video = req.files.video;

    //validate
    if (
      !sectionId ||
      !title ||
      !timeDuration ||
      !description ||
      !video ||
      !courseId
    ) {
      return res.status(400).json({
        success: false,
        message: "all field are required",
      });
    }

    //upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //create a subsection
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    //update section with this subsection objectId
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: subSectionDetails._id } },
      { new: true }
    );
    const data = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    //todo : log updated section here after adding populate query

    return res.status(200).json({
      success: true,
      message: "sub section created successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description, subSectionId } =
      req.body;
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "cannot get sectionId",
      });
    }

    const video = req.files?.video;

    const updateData = {};
    if (title) updateData.title = title;
    if (timeDuration) updateData.timeDuration = timeDuration;
    if (description) updateData.description = description;
    if (video) {
      var videoData = await uploadVideoToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      updateData.videoUrl = videoData.secure_url;
    }

    await SubSection.findByIdAndUpdate(
      subSectionId,
      { $set: updateData },
      { new: true }
    );
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );
    return res.status(200).json({
      success: true,
      data: updatedSection,
      videoData: videoData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;

    if (!sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "please enter all fields",
      });
    }

    const sectionResponse = await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { subSection: subSectionId } },
      { new: true }
    );

    if (!sectionResponse) {
      return res.status(400).json({
        success: false,
        message: "Section not found",
      });
    }
    const subSectionResponse = await SubSection.findByIdAndDelete(subSectionId);
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection not found",
      });
    }

    return res.status(200).json({
      success: true,
      sectionResponse: updatedSection,
      subSectionResponse: subSectionResponse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.AddComment = async (req, res) => {
  try {
    const { comment, subSectionId, courseId } = req.body;
    const userId = req.user.id;

    if (!comment || !subSectionId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Enter all fields" });
    }

    // Await the result of the user fetch
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userName = user.firstName + " " + user.lastName;

    // Create the comment
    const response = await Comments.create({
      Comment: comment,
      UserImageOfComment: user.image,
      UserNameOfComment: userName,
      course: courseId,
    });
    const subSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      { $push: { Comment: response._id } },
      { new: true }
    );

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "Subsection not found" });
    }

    if (!response) {
      return res
        .status(200)
        .json({ success: true, message: "Error in updating subsection" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Comment added successfully",
        data: response,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.fetchComment = async (req, res) => {
  try {
    const { subSectionId } = req.body;

    if (!subSectionId)
      return res.status(400).json({
        success: false,
        message: "Enter subSectionId",
      });

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "Can't fetch section",
      });
    }

    const commentsIds = subSection.Comment;

    let comments = [];
    for (const commentId of commentsIds) {
      const comment = await Comments.findOne(commentId);
      comments.push(comment);
    }

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments: comments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
