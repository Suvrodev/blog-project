"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogControllers = void 0;
const blog_service_1 = require("./blog.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
///Create Blog
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedUser = req === null || req === void 0 ? void 0 : req.user;
        console.log("Logged User: ", loggedUser);
        if ((loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.role) === "Admin") {
            throw new AppError_1.default(403, "Admin is unable to create blog");
        }
        const blogData = req === null || req === void 0 ? void 0 : req.body;
        blogData.author = loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id;
        console.log("Blog data: ", blogData);
        const result = yield blog_service_1.BlogServices.createBlogIntoDB(blogData);
        // console.log("Result: ", result); // Full Mongoose Document
        const newResult = result.toObject();
        // console.log("New Result: ", newResult);
        // Structure the result to add loggedUser inside the author details
        const newResultWithUser = Object.assign(Object.assign({}, newResult), { author: loggedUser });
        const { isPublished, createdAt, updatedAt, __v } = newResultWithUser, finalResult = __rest(newResultWithUser, ["isPublished", "createdAt", "updatedAt", "__v"]);
        // console.log("New Result with User: ", newResultWithUser);
        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            statusCode: 201,
            data: finalResult,
        });
    }
    catch (error) {
        next(error);
    }
});
//Get All Blog
const getAllBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blog_service_1.BlogServices.getAllBlogsFromDB(req.query);
        res.status(201).json({
            success: true,
            message: "Blog retrive successfully",
            statusCode: 201,
            data: { result },
        });
    }
    catch (error) {
        next(error);
    }
});
//Get Single Blog
const getSingleBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield blog_service_1.BlogServices.getSingleBlogFromDB(id);
        res.status(201).json({
            success: true,
            message: "Blog retrive successfully",
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//Delete Blog
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: loggedUserId } = req.user;
        const id = req.params.id;
        const result = yield blog_service_1.BlogServices.deleteBlogFromDB(id, loggedUserId);
        res.status(201).json({
            success: true,
            message: "Blog deleted successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        next(error);
    }
});
//Update Blog
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, id: loggedUserId } = req.user;
        // console.log("Logged User Role: ", role);
        if (role === "Admin") {
            throw new AppError_1.default(500, "Admin can not update blog");
        }
        const id = req.params.id;
        const result = yield blog_service_1.BlogServices.updateBlogIntoDB(id, req.body, loggedUserId);
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            statusCode: 200,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.blogControllers = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    deleteBlog,
    updateBlog,
};
