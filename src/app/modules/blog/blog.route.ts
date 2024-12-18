import express from "express";
import { blogControllers } from "./blog.controller";
const router = express.Router();

router.post("/", blogControllers.createBlog);
router.get("/", blogControllers.getAllBlog);
router.get("/:id", blogControllers.getSingleBlog);
router.delete("/:id", blogControllers.deleteBlog);
router.patch("/:id", blogControllers.updateBlog);

export const blogRoutes = router;
