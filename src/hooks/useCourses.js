import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConnector } from "../services/apiconnector";
import { courseEndpoints, commentEndpoint } from "../services/apis";
import toast from "react-hot-toast";

const {
  CATEGORIES_API,
  COURSE_DETAILS_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  UPDATE_COURSE_STATUS_API,
  LECTURE_COMPLETION_API,
  GET_COMPLETION_API,
  UNMARK_COURSE_PROGRESS,
  CREATE_RATING_API,
  GET_ALL_RATINGS,
} = courseEndpoints;

const { FETCH_COMMENTS, ADD_COMMENT } = commentEndpoint;

// Helper function to get token
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Not authenticated");
  }
  return JSON.parse(token);
};

// Query hooks
export function useCourseCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["courseCategories"],
    queryFn: async () => {
      const response = await apiConnector("GET", CATEGORIES_API);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.Categorys || [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}

export function useCourseDetails(courseId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: async () => {
      const response = await apiConnector("POST", COURSE_DETAILS_API, {
        courseId,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    },
    enabled: !!courseId,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useInstructorCourses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["instructorCourses"],
    queryFn: async () => {
      const token = getToken();
      const response = await apiConnector(
        "GET",
        GET_ALL_INSTRUCTOR_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response?.data?.success) {
        throw new Error(response.data.message || "Could not fetch courses");
      }
      return response.data.data || [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}

export function useFullCourseDetails(courseId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fullCourseDetails", courseId],
    queryFn: async () => {
      const token = getToken();
      const response = await apiConnector(
        "POST",
        GET_FULL_COURSE_DETAILS_AUTHENTICATED,
        { courseId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    },
    enabled: !!courseId,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export function useAllRatings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allRatings"],
    queryFn: async () => {
      const response = await apiConnector("GET", GET_ALL_RATINGS);
      if (!response?.data?.success) {
        throw new Error("Could not fetch ratings");
      }
      return response.data.data || [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}

export function useCourseProgress(courseId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["courseProgress", courseId],
    queryFn: async () => {
      const token = getToken();
      const response = await apiConnector(
        "POST",
        GET_COMPLETION_API,
        { courseId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.message) {
        throw new Error(response.data.error || "Could not fetch progress");
      }
      return response.data.courseProgress || [];
    },
    enabled: !!courseId,
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}

export function useComments(subSectionId, courseId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", subSectionId, courseId],
    queryFn: async () => {
      const token = getToken();
      const response = await apiConnector(
        "POST",
        FETCH_COMMENTS,
        { subSectionId, courseId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      return response?.data?.comments || [];
    },
    enabled: !!subSectionId && !!courseId,
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}

// Mutation hooks
export function useCreateCourse() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const token = getToken();
      const response = await apiConnector(
        "POST",
        CREATE_COURSE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Course created successfully");
      queryClient.invalidateQueries({ queryKey: ["instructorCourses"] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not create course");
    },
  });

  return {
    createCourse: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useEditCourse() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ formData, courseId }) => {
      const token = getToken();
      const response = await apiConnector("POST", EDIT_COURSE_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
      if (!response?.data?.success) {
        throw new Error(response.data.message || "Could Not Update Course Details");
      }
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Course Details Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["courseDetails", variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ["instructorCourses"] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not update course");
    },
  });

  return {
    editCourse: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (courseId) => {
      const token = getToken();
      const response = await apiConnector(
        "DELETE",
        DELETE_COURSE_API,
        { courseId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error("Could not delete course");
      }
      // Update localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.courses) {
        userData.courses = userData.courses.filter((course) => course._id !== courseId);
        localStorage.setItem("user", JSON.stringify(userData));
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Course deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["instructorCourses"] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not delete course");
    },
  });

  return {
    deleteCourse: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useUpdateCourseStatus() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", UPDATE_COURSE_STATUS_API, data, {
        Authorization: `Bearer ${token}`,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructorCourses"] });
    },
    onError: (error) => {
      console.error("Update course status error:", error);
    },
  });

  return {
    updateCourseStatus: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useCreateSection() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", CREATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || "Could Not Create Section");
      }
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Course Section Created");
      queryClient.invalidateQueries({ queryKey: ["fullCourseDetails", variables.courseId] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not create section");
    },
  });

  return {
    createSection: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useUpdateSection() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || "Could Not Update Section");
      }
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Course Section Updated");
      queryClient.invalidateQueries({ queryKey: ["fullCourseDetails", variables.courseId] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not update section");
    },
  });

  return {
    updateSection: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useDeleteSection() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", DELETE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data) {
        throw new Error("Could Not Delete Section");
      }
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Course Section Deleted");
      queryClient.invalidateQueries({ queryKey: ["fullCourseDetails", variables.courseId] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not delete section");
    },
  });

  return {
    deleteSection: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useCreateSubSection() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || "Could Not Add Lecture");
      }
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Lecture Added");
      queryClient.invalidateQueries({ queryKey: ["fullCourseDetails", variables.courseId] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not add lecture");
    },
  });

  return {
    createSubSection: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useUpdateSubSection() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || "Could Not Update Lecture");
      }
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Lecture Updated");
      queryClient.invalidateQueries({ queryKey: ["fullCourseDetails", variables.courseId] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not update lecture");
    },
  });

  return {
    updateSubSection: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useDeleteSubSection() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || "Could Not Delete Lecture");
      }
      return response.data.sectionResponse;
    },
    onSuccess: (_, variables) => {
      toast.success("Lecture Deleted");
      queryClient.invalidateQueries({ queryKey: ["fullCourseDetails", variables.courseId] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not delete lecture");
    },
  });

  return {
    deleteSubSection: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useCreateRating() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response?.data?.success) {
        throw new Error(response.data.message || "Could Not Create Rating");
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Rating Created");
      queryClient.invalidateQueries({ queryKey: ["allRatings"] });
    },
    onError: (error) => {
      toast.error("You Already Review Course");
    },
  });

  return {
    createRating: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useMarkLectureComplete() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.message) {
        throw new Error(response.data.error || "Could not mark lecture as complete");
      }
      return response.data.courseProgress;
    },
    onSuccess: (_, variables) => {
      toast.success("Lecture Completed");
      queryClient.invalidateQueries({ queryKey: ["courseProgress", variables.courseId] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not mark lecture as complete");
    },
  });

  return {
    markLectureComplete: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useUnmarkLectureProgress() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", UNMARK_COURSE_PROGRESS, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.message) {
        throw new Error(response.data.error || "Could not unmark lecture progress");
      }
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Lecture Marked Uncomplete");
      queryClient.invalidateQueries({ queryKey: ["courseProgress", variables.courseId] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not unmark lecture progress");
    },
  });

  return {
    unmarkLectureProgress: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

export function useAddComment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = getToken();
      const response = await apiConnector("POST", ADD_COMMENT, data, {
        Authorization: `Bearer ${token}`,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.subSectionId, variables.courseId],
      });
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
      toast.error("Could not add comment");
    },
  });

  return {
    addComment: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
