import { z } from "zod";

// Define the validation schema for a blog
const blogValidationSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(1, "Title cannot be empty"),
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, "Content cannot be empty"),
  author: z
    .string({
      required_error: "Author is required",
    })
    .regex(/^[a-fA-F0-9]{24}$/, "Author must be a valid ObjectId"), // Validate MongoDB ObjectId
  isPublished: z.boolean().optional().default(true), // Optional with default value true
  isDeleted: z.boolean().optional().default(false), // Optional with default value false
});

export const blogValidations = {
  blogValidationSchema,
};
