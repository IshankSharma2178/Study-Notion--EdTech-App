import { z } from "zod";

// Course schemas - shared between frontend and backend
export const createCourseSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  courseDescription: z.string().min(1, "Course description is required"),
  whatYouWillLearn: z.string().min(1, "What you will learn is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  tag: z.union([z.string(), z.array(z.string())]).optional(),
  instructions: z.union([z.string(), z.array(z.string())]).optional(),
  status: z.enum(["Draft", "Published"]).optional(),
});

export const updateCourseSchema = createCourseSchema.partial();

export const courseIdSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
});

export const createSectionSchema = z.object({
  sectionName: z.string().min(1, "Section name is required"),
  courseId: z.string().min(1, "Course ID is required"),
});

export const updateSectionSchema = z.object({
  sectionName: z.string().min(1, "Section name is required"),
  sectionId: z.string().min(1, "Section ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
});

export const deleteSectionSchema = z.object({
  sectionId: z.string().min(1, "Section ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
});

export const createSubSectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  sectionId: z.string().min(1, "Section ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
  timeDuration: z.string().optional(),
});

export const updateSubSectionSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  subSectionId: z.string().min(1, "Sub-section ID is required"),
  sectionId: z.string().min(1, "Section ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
  timeDuration: z.string().optional(),
});

export const deleteSubSectionSchema = z.object({
  subSectionId: z.string().min(1, "Sub-section ID is required"),
  sectionId: z.string().min(1, "Section ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
});

export const updateCourseStatusSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  status: z.enum(["Draft", "Published"]),
});

export const markLectureCompleteSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  subSectionId: z.string().min(1, "Sub-section ID is required"),
});

export const createRatingSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  review: z.string().min(1, "Review is required"),
});

export const addCommentSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
  subSectionId: z.string().min(1, "Sub-section ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
});

export const fetchCommentsSchema = z.object({
  subSectionId: z.string().min(1, "Sub-section ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
});

export const catalogPageDataSchema = z.object({
  categoryId: z.string().min(1, "Category ID is required"),
});

