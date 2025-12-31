// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const { login, signup, sendOTP } = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
  changePassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");
const { validate } = require("../middlewares/validation");

// Import shared schemas for validation
const {
  loginSchema,
  signupSchema,
  sendOtpSchema,
  resetPasswordTokenSchema,
  resetPasswordSchema,
  changePasswordSchema,
} = require("../../packages/shared/schemas/index.cjs");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login - with validation
router.post("/login", validate(loginSchema, "body"), login);

// Route for user signup - with validation
router.post("/signup", validate(signupSchema, "body"), signup);

// Route for sending OTP to the user's email - with validation
router.post("/sendotp", validate(sendOtpSchema, "body"), sendOTP);

// Route for Changing the password - with validation
router.post(
  "/changePassword",
  auth,
  validate(changePasswordSchema, "body"),
  changePassword
);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token - with validation
router.post(
  "/reset-password-token",
  validate(resetPasswordTokenSchema, "body"),
  resetPasswordToken
);

// Route for resetting user's password after verification - with validation
router.post(
  "/reset-password",
  validate(resetPasswordSchema, "body"),
  resetPassword
);

// Export the router for use in the main application
module.exports = router;
