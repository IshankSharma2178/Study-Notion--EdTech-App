const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API:BASE_URL + "/course/getAllCourses"
};

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API:BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API:BASE_URL + "/profile/updateProfiLe",
    CHANGE_PASSWORD_API:BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API:BASE_URL + "/profile/deleteProfile",
}

export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }