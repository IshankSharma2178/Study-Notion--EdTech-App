// Import the required modules
const express = require("express");
const router = express.Router();

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Importing Middlewares
const { auth, isInstructor } = require("../middlewares/auth");
const { validate } = require("../middlewares/validation");

// Import shared schemas for validation
const {
  createSectionSchema,
  updateSectionSchema,
  deleteSectionSchema,
} = require("../../packages/shared/schemas/index.cjs");

// ********************************************************************************************************
//                                      Section routes
// ********************************************************************************************************

// Add a Section to a Course - with validation
router.post(
  "/addSection",
  auth,
  isInstructor,
  validate(createSectionSchema, "body"),
  createSection
);

// Update a Section - with validation
router.post(
  "/updateSection",
  auth,
  isInstructor,
  validate(updateSectionSchema, "body"),
  updateSection
);

// Delete a Section - with validation
router.post(
  "/deleteSection",
  auth,
  isInstructor,
  validate(deleteSectionSchema, "body"),
  deleteSection
);

module.exports = router;

