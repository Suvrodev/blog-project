import express from "express";
import { blogControllers } from "./blog.controller";
import { blogValidations } from "./blog.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(blogValidations.blogValidationSchema),
  blogControllers.createBlog
);
router.get("/", blogControllers.getAllBlog);
router.get("/:id", blogControllers.getSingleBlog);
router.delete("/:id", auth(), blogControllers.deleteBlog);
router.patch("/:id", auth(), blogControllers.updateBlog);

export const blogRoutes = router;
