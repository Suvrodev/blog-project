import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "users", required: true },
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
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
  }
);

//Pre Query middleware for dont match isDeleted:true for all
blogSchema.pre("find", function (next) {
  console.log("Pres Middleware of blog");
  this.find({ isDeleted: { $ne: true } });
  next();
});

//Pre Query middleware for dont match isDeleted:true for all
blogSchema.pre("findOne", function (next) {
  console.log("Pres Middleware of blog");
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const blogModel = model<TBlog>("blogs", blogSchema);