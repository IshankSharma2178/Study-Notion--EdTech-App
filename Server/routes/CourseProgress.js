// Import the required modules
const express = require("express");
const router = express.Router();

const {
  updateCourseProgress,
  fetchCompletedVideos,
  unMarkLectureProgress,
} = require("../controllers/CourseProgress");

// Importing Middlewares
const { auth, isStudent } = require("../middlewares/auth");
const { validate } = require("../middlewares/validation");

// Import shared schemas for validation
const {
  courseIdSchema,
  markLectureCompleteSchema,
} = require("../../packages/shared/schemas/index.cjs");

// ********************************************************************************************************
//                                      Course Progress routes
// ********************************************************************************************************
// Update course progress - with validation
router.post(
  "/updateCourseProgress",
  auth,
  isStudent,
  validate(markLectureCompleteSchema, "body"),
  updateCourseProgress
);

// Fetch course progress - with validation
router.post(
  "/fetchCourseProgress",
  auth,
  isStudent,
  validate(courseIdSchema, "body"),
  fetchCompletedVideos
);

// Unmark progress - with validation
router.post(
  "/unMarkProgress",
  auth,
  isStudent,
  validate(markLectureCompleteSchema, "body"),
  unMarkLectureProgress
);

module.exports = router;

