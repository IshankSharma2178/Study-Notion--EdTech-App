// Import the required modules
const express = require("express");
const router = express.Router();

// Categories Controllers Import
const {
  showAllCategorys,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Importing Middlewares
const { auth, isAdmin } = require("../middlewares/auth");
const { validate } = require("../middlewares/validation");

// Import shared schemas for validation
const { catalogPageDataSchema } = require("../../packages/shared/schemas/index.cjs");

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategorys);
router.post(
  "/getCategoryPageDetails",
  validate(catalogPageDataSchema, "body"),
  categoryPageDetails
);

module.exports = router;

