const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

// to send email

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponder = await mailSender(
      email,
      "Verification Email from StudyNotion",
      otp
    );
  } catch (err) {
    throw err;
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp); //is object ke email ke liye this use kiya
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
