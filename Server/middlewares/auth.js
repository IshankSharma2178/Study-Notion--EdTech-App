const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = async (req, res, next) => {
  try {
    //extract token
    const token =
      req.body.token ||
      req.cookies.token ||
      req.get("Authorization")?.replace("Bearer ", "").replace(/^"|"$/g, "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }
    //verify the token
    const Secret = process.env.JWT_SECRET;
    try {
      const payload = jwt.verify(token, Secret);
      req.user = payload;
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "token is invalid ",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(403).json({
        success: false,
        message:
          "this is a protected route for students only.you can access it",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message:
          "this is a protected route for Instructor only.you can't access it",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "this is a protected route for Admin only.you can't access it",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
