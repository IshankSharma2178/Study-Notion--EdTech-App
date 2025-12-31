// Import the required modules
const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payments");
const { auth, isStudent } = require("../middlewares/auth");
const { validate } = require("../middlewares/validation");

// Import shared schemas for validation
const {
  coursePaymentSchema,
  verifyPaymentSchema,
  sendPaymentSuccessEmailSchema,
} = require("../../packages/shared/schemas/index.cjs");

router.post(
  "/capturePayment",
  auth,
  isStudent,
  validate(coursePaymentSchema, "body"),
  capturePayment
);
router.post(
  "/verifyPayment",
  auth,
  isStudent,
  validate(verifyPaymentSchema, "body"),
  verifyPayment
);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  validate(sendPaymentSuccessEmailSchema, "body"),
  sendPaymentSuccessEmail
);

module.exports = router;
