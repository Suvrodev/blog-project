import { TBlog } from "./blog.interface";
import { blogModel } from "./blog.model";

///Create Blog
const createBlogIntoDB = async (payload: TBlog) => {
  const result = await blogModel.create(payload);
  return result;
};

///Get All Blog
const getAllBlogsFromDB = async () => {
  //   const result = await blogModel.find();
  const result = await blogModel.find().populate("author");
  return result;
};

//Get Single Blog
const getSingleBlogFromDB = async (id: string) => {
  const result = await blogModel.findById(id).populate("author");
  return result;
};

//Delete Blog
const deleteBlogFromDB = async (id: string) => {
  const result = await blogModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

//update Blog
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  console.log("Modified Data: ", payload);
  const result = await blogModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  deleteBlogFromDB,
  updateBlogIntoDB,
};
