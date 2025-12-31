import { z } from "zod";

export function validateWithZod(schema, data) {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError?.message || "Validation failed",
      };
    }
    return {
      success: false,
      error: error.message || "Validation failed",
    };
  }
}

export function validateOrThrow(schema, data) {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      throw new Error(firstError?.message || "Validation failed");
    }
    throw error;
  }
}
