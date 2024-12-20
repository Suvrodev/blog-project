"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidations = void 0;
const zod_1 = require("zod");
// Define the validation schema for a blog
const blogValidationSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Title is required",
    })
        .trim()
        .min(1, "Title cannot be empty"),
    content: zod_1.z
        .string({
        required_error: "Content is required",
    })
        .min(1, "Content cannot be empty"),
    author: zod_1.z.string().optional(), // Made optional
    isPublished: zod_1.z.boolean().optional().default(true), // Optional with default value true
});
exports.blogValidations = {
    blogValidationSchema,
};
