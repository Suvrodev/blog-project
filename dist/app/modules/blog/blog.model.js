"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    isPublished: { type: Boolean, default: true },
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
    toJSON: {
        transform: function (_doc, ret) {
            delete ret.__v;
            delete ret.isPublished;
            delete ret.isDeleted;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        },
    },
});
//Pre Query middleware for dont match isDeleted:true for all
blogSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
//Pre Query middleware for dont match isDeleted:true for all
blogSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.blogModel = (0, mongoose_1.model)("blogs", blogSchema);
