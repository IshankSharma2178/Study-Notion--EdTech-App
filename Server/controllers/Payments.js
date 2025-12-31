const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollement");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
require("dotenv").config();

// Initialize razorPay order
exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    // 1️⃣ Validate input
    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No courses provided",
      });
    }

    // 2️⃣ Extract course IDs (frontend sends objects with _id)
    const courseIds = courses.map((course) =>
      typeof course === "string" ? course : course._id
    );

    // 3️⃣ Validate all course IDs are valid MongoDB ObjectIds
    const validIds = courseIds.every((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    if (!validIds) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    // 4️⃣ Fetch all courses in one DB call
    const courseDocs = await Course.find({
      _id: { $in: courseIds },
    });

    // 5️⃣ Check if any course is missing
    if (courseDocs.length !== courseIds.length) {
      return res.status(404).json({
        success: false,
        message: "One or more courses not found",
      });
    }

    let totalAmount = 0;

    // 6️⃣ Validate enrollment & calculate total price
    for (const course of courseDocs) {
      const alreadyEnrolled = course.studentEnrolled.some(
        (id) => id.toString() === userId
      );

      if (alreadyEnrolled) {
        return res.status(409).json({
          success: false,
          message: `Already enrolled in ${course.courseName}`,
        });
      }

      totalAmount += Number(course.price);
    }

    // Validate total amount
    if (totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid course pricing",
      });
    }

    // 7️⃣ Create Razorpay order
    const options = {
      amount: totalAmount * 100, // convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        userId: userId,
        courseIds: courseIds.join(","),
      },
    };

    const paymentResponse = await instance.orders.create(options);

    // 8️⃣ Send order details to frontend
    return res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.error("CAPTURE PAYMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate payment",
      error: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  // Validate all required fields
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required payment details",
    });
  }

  try {
    // Verify signature
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Signature verified - enroll students
      return await enrollStudents(courses, userId, res);
    }

    return res.status(400).json({
      success: false,
      message: "Payment signature verification failed",
    });
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide data for courses or userId",
    });
  }

  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Extract course IDs from course objects
    const courseIds = courses.map((course) =>
      typeof course === "string" ? course : course._id
    );

    // Validate all course IDs
    const validIds = courseIds.every((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    if (!validIds) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    // Fetch user details
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create course progress for all courses
    const courseProgressDocs = await CourseProgress.insertMany(
      courseIds.map((courseId) => ({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })),
      { session }
    );

    const courseProgressIds = courseProgressDocs.map((doc) => doc._id);

    // Update all courses at once
    const coursesUpdated = await Course.updateMany(
      { _id: { $in: courseIds } },
      {
        $addToSet: { studentEnrolled: userId },
      },
      { session }
    );

    // Update user with all courses and progress
    const updatedStudent = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          courses: { $each: courseIds },
          courseProgress: { $each: courseProgressIds },
        },
      },
      { new: true, session }
    );

    // Commit transaction
    await session.commitTransaction();

    // Send enrollment emails (outside transaction)
    const enrolledCourses = await Course.find({ _id: { $in: courseIds } });

    // Send emails asynchronously (don't wait for them)
    enrolledCourses.forEach(async (course) => {
      try {
        await mailSender(
          updatedStudent.email,
          `Successfully Enrolled into ${course.courseName}`,
          courseEnrollmentEmail(
            course.courseName,
            `${updatedStudent.firstName}`
          )
        );
      } catch (emailError) {
        console.error(
          `Failed to send enrollment email for ${course.courseName}:`,
          emailError
        );
        // Don't fail the enrollment if email fails
      }
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified and student enrolled successfully",
      data: {
        enrolledCourses: courseIds,
      },
    });
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    console.error("ENROLL STUDENTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to enroll student",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  // Validate required fields
  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    // Fetch user details
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send payment success email
    await mailSender(
      user.email,
      `Payment Received`,
      paymentSuccessEmail(`${user.firstName}`, amount / 100, orderId, paymentId)
    );

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Payment success email sent successfully",
    });
  } catch (error) {
    console.error("SEND PAYMENT EMAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Could not send email",
      error: error.message,
    });
  }
};
