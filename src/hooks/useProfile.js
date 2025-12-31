import { useQuery } from "@tanstack/react-query";
import { apiConnector } from "../services/apiconnector";
import { profileEndpoints } from "../services/apis";

const { GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndpoints;

// Helper function to get token
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Not authenticated");
  }
  return JSON.parse(token);
};

export function useUserEnrolledCourses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userEnrolledCourses"],
    queryFn: async () => {
      const token = getToken();
      const response = await apiConnector(
        "POST",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response?.data?.data?.courses) {
        throw new Error("Could not fetch enrolled courses");
      }
      return response.data.data.courses || [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}

export function useInstructorData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["instructorData"],
    queryFn: async () => {
      const token = getToken();
      const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
        Authorization: `Bearer ${token}`,
      });
      if (!response?.data?.courses) {
        throw new Error("Could Not Get Instructor Data");
      }
      return response.data.courses || [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}
