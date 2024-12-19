import { TBlog } from "./blog.interface";
import { blogModel } from "./blog.model";

///Create Blog
const createBlogIntoDB = async (payload: TBlog) => {
  const result = await blogModel.create(payload);
  return result;
};

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
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const { search, sortBy, sortOrder, filter } = query;

  // Build DB Query
  const dbQuery: any = {};
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
  const sortOption: { [key: string]: 1 | -1 } = {};
  if (sortBy && typeof sortBy === "string" && typeof sortOrder === "string") {
    sortOption[sortBy] = sortOrder.toLowerCase() === "desc" ? -1 : 1;
  }

  console.log("Sort Option:", sortOption);

  // Fetch Blogs
  const result = await blogModel
    .find(dbQuery)
    .populate("author")
    .sort(sortOption);

  return result;
};

//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################
//########################################################################################################################################################################

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
