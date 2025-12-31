// Import the required modules
const express = require("express");
const router = express.Router();

const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  updateCourseStatus,
} = require("../controllers/Course");

// Importing Middlewares
const { auth, isInstructor } = require("../middlewares/auth");
const { validate } = require("../middlewares/validation");

// Import shared schemas for validation
const {
  createCourseSchema,
  courseIdSchema,
  updateCourseStatusSchema,
} = require("../../packages/shared/schemas/index.cjs");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors - with validation
router.post(
  "/createCourse",
  auth,
  isInstructor,
  validate(createCourseSchema, "body"),
  createCourse
);

// Get all Registered Courses
router.get("/getAllCourses", showAllCourses);
// Get Details for a Specific Courses - with validation
router.post(
  "/getFullCourseDetails",
  auth,
  validate(courseIdSchema, "body"),
  getFullCourseDetails
);
// Edit Course routes - with validation (partial schema for updates)
router.post("/editCourse", auth, isInstructor, editCourse);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// Delete a Course - with validation
router.delete(
  "/deleteCourse",
  auth,
  isInstructor,
  validate(courseIdSchema, "body"),
  deleteCourse
);

// Get course details - with validation
router.post(
  "/getCourseDetails",
  validate(courseIdSchema, "body"),
  getCourseDetails
);

// Update course status - with validation
router.post(
  "/updateCourseStatus",
  auth,
  isInstructor,
  validate(updateCourseStatusSchema, "body"),
  updateCourseStatus
);

module.exports = router;
