import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { blogRoutes } from "../modules/blog/blog.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth/register",
    route: userRoutes,
  },
  {
    path: "/auth/login",
    route: AuthRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
