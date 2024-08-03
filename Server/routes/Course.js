// Import the required modules
const express = require("express")
const router = express.Router()


const {createCourse,
    showAllCourses,
    getCourseDetails
    ,getFullCourseDetails
    ,editCourse
    ,getInstructorCourses
    ,deleteCourse,
    updateCourseStatus
} = require("../controllers/Course")

const {updateCourseProgress , fetchCompletedVideos , unMarkLectureProgress } = require("../controllers/CourseProgress");

// Categories Controllers Import
const {showAllCategorys,createCategory,categoryPageDetails} = require("../controllers/Category")

// Sections Controllers Import
const {createSection,updateSection,deleteSection,} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {createSubSection,
    updateSubSection
    ,deleteSubSection,
    AddComment,
    fetchComment
} = require("../controllers/SubSection")

// Rating Controllers Import
const {createRating,getAverageRating,getAllRating,} = require("../controllers/RatingAndReview")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Add a commnet to subSection
router.post("/addComment", auth, isStudent, AddComment)
//fetch all comments
router.post("/getAllComments", auth, isStudent, fetchComment)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse",auth,isInstructor, deleteCourse)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.post("/fetchCourseProgress",auth, isStudent, fetchCompletedVideos);

router.post("/unMarkProgress",auth, isStudent, unMarkLectureProgress);

router.post("/getCourseDetails", getCourseDetails)

router.post("/updateCourseStatus", auth, isInstructor, updateCourseStatus)



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategorys)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router