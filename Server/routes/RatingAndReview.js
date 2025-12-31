// Import the required modules
const express = require("express");
const router = express.Router();

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

// Importing Middlewares
const { auth, isStudent } = require("../middlewares/auth");
const { validate } = require("../middlewares/validation");

// Import shared schemas for validation
const { createRatingSchema } = require("../../packages/shared/schemas/index.cjs");

// ********************************************************************************************************
//                                      Rating and Review routes
// ********************************************************************************************************
router.post(
  "/createRating",
  auth,
  isStudent,
  validate(createRatingSchema, "body"),
  createRating
);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;

