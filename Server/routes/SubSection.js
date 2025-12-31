// Import the required modules
const express = require("express");
const router = express.Router();

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
  AddComment,
  fetchComment,
} = require("../controllers/SubSection");

// Importing Middlewares
const { auth, isInstructor, isStudent } = require("../middlewares/auth");
const { validate } = require("../middlewares/validation");

// Import shared schemas for validation
const {
  createSubSectionSchema,
  updateSubSectionSchema,
  deleteSubSectionSchema,
  addCommentSchema,
  fetchCommentsSchema,
} = require("../../packages/shared/schemas/index.cjs");

// ********************************************************************************************************
//                                      SubSection routes
// ********************************************************************************************************

// Add a Sub Section to a Section - with validation
router.post(
  "/addSubSection",
  auth,
  isInstructor,
  validate(createSubSectionSchema, "body"),
  createSubSection
);

// Edit Sub Section - with validation
router.post(
  "/updateSubSection",
  auth,
  isInstructor,
  validate(updateSubSectionSchema, "body"),
  updateSubSection
);

// Delete Sub Section - with validation
router.post(
  "/deleteSubSection",
  auth,
  isInstructor,
  validate(deleteSubSectionSchema, "body"),
  deleteSubSection
);

// Add a comment to subSection - with validation
router.post(
  "/addComment",
  auth,
  isStudent,
  validate(addCommentSchema, "body"),
  AddComment
);

// Fetch all comments - with validation
router.post(
  "/getAllComments",
  auth,
  isStudent,
  validate(fetchCommentsSchema, "body"),
  fetchComment
);

module.exports = router;

