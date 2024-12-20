"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const blog_route_1 = require("../modules/blog/blog.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth/register",
        route: user_route_1.userRoutes,
    },
    {
        path: "/auth/login",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/blogs",
        route: blog_route_1.blogRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
