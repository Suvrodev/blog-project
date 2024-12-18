import express from "express";
import { userControllers } from "./user.controller";
const router = express.Router();

router.post("/register", userControllers.registerUser);

export const userRoutes = router;
