"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), (0, validateRequest_1.default)(blog_validation_1.blogValidations.blogValidationSchema), blog_controller_1.blogControllers.createBlog);
router.get("/", blog_controller_1.blogControllers.getAllBlog);
router.get("/:id", blog_controller_1.blogControllers.getSingleBlog);
router.delete("/:id", (0, auth_1.default)(), blog_controller_1.blogControllers.deleteBlog);
router.patch("/:id", (0, auth_1.default)(), blog_controller_1.blogControllers.updateBlog);
exports.blogRoutes = router;
