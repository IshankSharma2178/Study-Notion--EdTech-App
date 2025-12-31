const express = require("express");
const router = express.Router();

const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile");

// Importing Middlewares
const { auth, isInstructor, isStudent } = require("../middlewares/auth");
const { validate } = require("../middlewares/validation");

// Import shared schemas for validation
const {
  updateProfileSchema,
} = require("../../packages/shared/schemas/index.cjs");
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount);
router.put(
  "/updateProfile",
  auth,
  validate(updateProfileSchema, "body"),
  updateProfile
);
router.get("/getUserDetails", auth, getAllUserDetails);
// Get Enrolled Courses
router.post("/getEnrolledCourses", auth, isStudent, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;
