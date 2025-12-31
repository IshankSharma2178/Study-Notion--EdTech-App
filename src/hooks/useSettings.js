import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../slices/authSlice";
import { setProfile } from "../slices/profileSlice";
import { apiConnector } from "../services/apiconnector";
import { settingsEndpoints } from "../services/apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

// Helper function to get token
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Not authenticated");
  }
  return JSON.parse(token);
};

export function useUpdateDisplayPicture() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const token = getToken();
      const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Could Not Update Display Picture");
      }

      return response.data.data;
    },
    onSuccess: (data) => {
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(data));
      queryClient.invalidateQueries({ queryKey: ["userEnrolledCourses"] });
      queryClient.invalidateQueries({ queryKey: ["instructorData"] });
    },
    onError: (error) => {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR:", error);
      toast.error(error.message || "Could Not Update Display Picture");
    },
  });

  return {
    updateDisplayPicture: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useUpdateProfile() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async ({ contactNumber, dateOfBirth, firstName, lastName, gender, about }) => {
      const token = getToken();
      const response = await apiConnector(
        "PUT",
        UPDATE_PROFILE_API,
        { contactNumber, dateOfBirth, firstName, lastName, gender, about },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Could not update profile");
      }

      return {
        userData: response.data.userData,
        profileData: response.data.profileData,
      };
    },
    onSuccess: (data) => {
      toast.success("Changed Successfully");
      dispatch(setUser(data.userData));
      dispatch(setProfile(data.profileData));
      queryClient.invalidateQueries({ queryKey: ["userEnrolledCourses"] });
      queryClient.invalidateQueries({ queryKey: ["instructorData"] });
    },
    onError: (error) => {
      console.log("UPDATE_PROFILE_API ERROR:", error);
      toast.error(error.message || "Could not update profile");
    },
  });

  return {
    updateProfile: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useDeleteAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const mutation = useMutation({
    mutationFn: async () => {
      const token = getToken();
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Could not delete account");
      }

      return response.data;
    },
    onSuccess: () => {
      localStorage.clear();
      dispatch(setUser(null));
      dispatch(setToken(null));
      dispatch(setProfile(null));
      navigate("/");
      toast.success("Account deleted successfully");
    },
    onError: (error) => {
      console.log("DELETE_PROFILE_API ERROR:", error);
      toast.error(error.message || "Could not delete account");
    },
  });

  return {
    deleteAccount: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
