import express from "express";
import { blogControllers } from "./blog.controller";
import { blogValidations } from "./blog.validation";
import validateRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/",
  validateRequest(blogValidations.blogValidationSchema),
  blogControllers.createBlog
);
router.get("/", blogControllers.getAllBlog);
router.get("/:id", blogControllers.getSingleBlog);
router.delete("/:id", blogControllers.deleteBlog);
router.patch("/:id", blogControllers.updateBlog);

export const blogRoutes = router;
