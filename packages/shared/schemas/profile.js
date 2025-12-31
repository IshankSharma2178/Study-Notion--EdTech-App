import { z } from "zod";

// Profile schemas - shared between frontend and backend
export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  contactNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  about: z.string().optional(),
});

export const updateDisplayPictureSchema = z.object({
  imageFile: z.instanceof(File).optional(),
});

