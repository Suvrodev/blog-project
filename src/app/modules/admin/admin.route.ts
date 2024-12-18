import express from "express";
import { adminControllers } from "./admin.controller";

const router = express.Router();

router.delete("/blogs/:id", adminControllers.deleteBlogByAdmin);
router.patch("/users/:userId/block", adminControllers.makeUserBlockByAdmin);

export const AdminRoutes = router;
