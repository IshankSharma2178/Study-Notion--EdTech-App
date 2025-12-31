import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../slices/authSlice";
import { setProfile as setProfileSlice } from "../slices/profileSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../utils/constants";
import { apiConnector } from "../services/apiconnector";
import { endpoints } from "../services/apis";
import { validateWithZod } from "../lib/validation";
import {
  loginSchema,
  signupSchema,
  sendOtpSchema,
  resetPasswordTokenSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "@shared/schemas/auth";

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (input) => {
      // Validate with Zod
      const validation = validateWithZod(loginSchema, input);
      if (!validation.success) {
        throw new Error(validation.error);
      }

      // Make API call
      const response = await apiConnector(
        "POST",
        endpoints.LOGIN_API,
        validation.data
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Login successful");
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(setToken(JSON.stringify(data.token)));
      dispatch(setUser(data.user));
      dispatch(setProfileSlice(data.user.additionalDetails));

      if (data.user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
        navigate("/dashboard/my-courses");
      } else {
        navigate("/dashboard/enrolled-courses");
      }
    },
    onError: (error) => {
      console.log("Login error:", error);
      toast.error(error.message || "Please sign up first");
      navigate("/login");
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: async (input) => {
      // Validate with Zod
      const validation = validateWithZod(signupSchema, input);
      if (!validation.success) {
        throw new Error(validation.error);
      }

      // Make API call
      const response = await apiConnector(
        "POST",
        endpoints.SIGNUP_API,
        validation.data
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Signup successful");
      navigate("/login");
    },
    onError: (error) => {
      console.log("Signup error:", error);
      toast.error(error.message || "Could not sign up user");
    },
  });

  // Send OTP mutation
  const sendOtpMutation = useMutation({
    mutationFn: async (input) => {
      // Validate with Zod
      const validation = validateWithZod(sendOtpSchema, input);
      if (!validation.success) {
        throw new Error(validation.error);
      }

      // Make API call
      const response = await apiConnector("POST", endpoints.SENDOTP_API, {
        ...validation.data,
        checkUserPresent: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("OTP sent successfully");
      navigate("/verify-email");
    },
    onError: (error) => {
      console.log("Send OTP error:", error);
      toast.error(error.message || "Email already exists");
    },
  });

  // Reset password token mutation
  const resetPasswordTokenMutation = useMutation({
    mutationFn: async (input) => {
      // Validate with Zod
      const validation = validateWithZod(resetPasswordTokenSchema, input);
      if (!validation.success) {
        throw new Error(validation.error);
      }

      // Make API call
      const response = await apiConnector(
        "POST",
        endpoints.RESETPASSTOKEN_API,
        validation.data
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Reset email sent successfully");
    },
    onError: (error) => {
      console.log("Reset password token error:", error);
      toast.error(error.message || "Reset password token error");
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async (input) => {
      // Validate with Zod
      const validation = validateWithZod(resetPasswordSchema, input);
      if (!validation.success) {
        throw new Error(validation.error);
      }

      // Make API call
      const response = await apiConnector(
        "POST",
        endpoints.RESETPASSWORD_API,
        validation.data
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully");
    },
    onError: (error) => {
      console.log("Reset password error:", error);
      toast.error(error.message || "Unable to reset password");
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async (input) => {
      // Validate with Zod
      const validation = validateWithZod(changePasswordSchema, input);
      if (!validation.success) {
        throw new Error(validation.error);
      }

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Not authenticated");
      }

      // Make API call
      const response = await apiConnector(
        "POST",
        endpoints.CHANGEPASSWORD_API,
        validation.data,
        {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      console.log("Change password error:", error);
      toast.error(error.message || "Could not change password");
    },
  });

  // Logout function (no API call needed)
  const logout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setProfileSlice(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out");
    navigate("/");
  };

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    sendOtp: sendOtpMutation.mutate,
    resetPasswordToken: resetPasswordTokenMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    logout,
    isLoading: {
      login: loginMutation.isPending,
      signup: signupMutation.isPending,
      sendOtp: sendOtpMutation.isPending,
      resetPasswordToken: resetPasswordTokenMutation.isPending,
      resetPassword: resetPasswordMutation.isPending,
      changePassword: changePasswordMutation.isPending,
    },
  };
}
