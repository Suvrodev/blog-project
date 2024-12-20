import express from "express";
import { adminControllers } from "./admin.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.delete("/blogs/:id", auth("Admin"), adminControllers.deleteBlogByAdmin);
router.patch(
  "/users/:userId/block",
  auth("Admin"),
  adminControllers.makeUserBlockByAdmin
);

export const AdminRoutes = router;
