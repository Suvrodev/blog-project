import AppError from "../../errors/AppError";
import { blogModel } from "../blog/blog.model";
import { TUser } from "../user/user.interface";
import { userModel } from "../user/user.model";

///Make User Blocked
const makeUserBlockedIntoDBByAdmin = async (
  id: string,
  payload: Partial<TUser>
) => {
  //At first Check user exists or not
  console.log("id of Blocked user from admin controller: ", id);
  const targetUser = await userModel.findById(id);
  console.log("Target user: ", targetUser);
  if (!targetUser) {
    console.log("This user not Exists");
    throw new AppError(404, "This User not exists");
  }

  const result = await userModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

//Delete Blog
const deleteBlogFromDBByAdmin = async (id: string) => {
  //Check this id is exists or not
  console.log("id of blog from admin service: ", id);

  const targetBlog = await blogModel.findById(id);
  console.log("Target Blog: ", targetBlog);
  if (!targetBlog) {
    throw new AppError(404, "This blog not exists");
  }

  const result = await blogModel.findByIdAndDelete(id);
  return result; //
};

export const adminServices = {
  makeUserBlockedIntoDBByAdmin,
  deleteBlogFromDBByAdmin,
};
