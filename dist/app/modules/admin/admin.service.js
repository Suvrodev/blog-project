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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const blog_model_1 = require("../blog/blog.model");
const user_model_1 = require("../user/user.model");
///Make User Blocked
const makeUserBlockedIntoDBByAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
//Delete Blog
const deleteBlogFromDBByAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.blogModel.findByIdAndDelete(id);
    return result;
});
exports.adminServices = {
    makeUserBlockedIntoDBByAdmin,
    deleteBlogFromDBByAdmin,
};