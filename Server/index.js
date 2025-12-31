require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const categoryRoutes = require("./routes/Category");
const ratingRoutes = require("./routes/RatingAndReview");
const courseProgressRoutes = require("./routes/CourseProgress");
const sectionRoutes = require("./routes/Section");
const subSectionRoutes = require("./routes/SubSection");
require("./config/database").connect();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.REACT_APP_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();

// REST API routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/section", sectionRoutes);
app.use("/api/v1/subsection", subSectionRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/rating", ratingRoutes);
app.use("/api/v1/progress", courseProgressRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`app is ruuning on port ${PORT}...`);
});
