import express from "express";
import { userControllers } from "./user.controller";
const router = express.Router();

router.post("/register", userControllers.registerUser);
router.get("/register", userControllers.getAllUsers);

export const userRoutes = router;
