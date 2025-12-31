const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
  CATEGORIES_API: BASE_URL + "/category/showAllCategories",
};

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHANGEPASSWORD_API: BASE_URL + "/auth/changePassword",
};

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};

export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  CATEGORIES_API: BASE_URL + "/category/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/section/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/subsection/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/section/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/subsection/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/section/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/subsection/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/progress/updateCourseProgress",
  GET_COMPLETION_API: BASE_URL + "/progress/fetchCourseProgress",
  UNMARK_COURSE_PROGRESS: BASE_URL + "/progress/unMarkProgress",
  CREATE_RATING_API: BASE_URL + "/rating/createRating",
  UPDATE_COURSE_STATUS_API: BASE_URL + "/course/updateCourseStatus",
  GET_ALL_RATINGS: BASE_URL + "/rating/getReviews",
};

export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/category/getCategoryPageDetails",
};

export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
};

export const commentEndpoint = {
  FETCH_COMMENTS: BASE_URL + "/subsection/getAllComments",
  ADD_COMMENT: BASE_URL + "/subsection/addComment",
};
