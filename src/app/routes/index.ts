import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { blogRoutes } from "../modules/blog/blog.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
