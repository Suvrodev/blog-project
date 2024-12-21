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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = require("./blog.model");
///Create Blog
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.blogModel.create(payload);
    return result;
});
///Get All Blog
// const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
//   console.log("Main Query: ", query);
//   const queryObj = { ...query };
//   const excludingImportant = ["search"];
//   excludingImportant.forEach((key) => delete queryObj[key]);
//   console.log("Query Obj: ", queryObj);
//   console.log("Query Obj.Filter: ", queryObj?.filter);
//   const search = query?.search || "";
//   console.log("Search: ", search);
//   const filter = query?.filter || "";
//   console.log("Filter: ", filter);
//   const searchableFields = ["title", "content"];
//   //   const result = await blogModel.find({
//   //     $or: [
//   //       { title: { $regex: search, $options: "i" } },
//   //       { content: { $regex: search, $options: "i" } },
//   //     ],
//   //   });
//   //   const result = await blogModel.find({
//   //     $or: searchableFields.map((field) => ({
//   //       [field]: { $regex: search, $options: "i" },
//   //     })),
//   //   });
//   const searchQuery = blogModel.find({
//     $or: searchableFields.map((field) => ({
//       [field]: { $regex: search, $options: "i" },
//     })),
//   });
//   const result = await searchQuery.find({ author: filter });
//   //   const result = await blogModel.find().populate("author");
//   return result;
// };
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//Get All Blog New
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy, sortOrder, filter } = query;
    // Build DB Query
    const dbQuery = {};
    if (search && typeof search === "string") {
        dbQuery.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ];
    }
    if (filter) {
        dbQuery.author = filter;
    }
    console.log("DB Query:", dbQuery);
    // Build Sort Option
    //In here in sort option will be type of a object where in object key will be string and value will be either 1 or -1
    const sortOption = {};
    if (sortBy && typeof sortBy === "string" && typeof sortOrder === "string") {
        sortOption[sortBy] = sortOrder.toLowerCase() === "desc" ? -1 : 1;
    }
    console.log("Sort Option:", sortOption);
    // Fetch Blogs
    const result = yield blog_model_1.blogModel
        .find(dbQuery)
        .populate("author")
        .sort(sortOption);
    return result;
});
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//Get Single Blog
const getSingleBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.blogModel.findById(id).populate("author");
    return result;
});
//Delete Blog
const deleteBlogFromDB = (id, loggedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Logged User id: ", loggedUserId);
    ///Check author of blog
    const targetBlog = yield blog_model_1.blogModel.findById(id);
    const blogAuthorId = targetBlog === null || targetBlog === void 0 ? void 0 : targetBlog.author;
    console.log("Author id of Target Blog: ", blogAuthorId);
    if (loggedUserId !== (blogAuthorId === null || blogAuthorId === void 0 ? void 0 : blogAuthorId.toString())) {
        throw new AppError_1.default(404, "Blog ref id and user is not same");
    }
    const result = yield blog_model_1.blogModel.findByIdAndDelete(id);
    return result;
});
//update Blog
const updateBlogIntoDB = (id, payload, loggedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log("Logged User id: ", loggedUserId);
    ///Check author of blog
    const targetBlog = yield blog_model_1.blogModel.findById(id);
    const blogAuthorId = targetBlog === null || targetBlog === void 0 ? void 0 : targetBlog.author;
    //   console.log("Author id of Target Blog: ", blogAuthorId);
    if (loggedUserId !== (blogAuthorId === null || blogAuthorId === void 0 ? void 0 : blogAuthorId.toString())) {
        throw new AppError_1.default(404, "Blog ref id and user is not same");
    }
    const result = yield blog_model_1.blogModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogFromDB,
    deleteBlogFromDB,
    updateBlogIntoDB,
};
