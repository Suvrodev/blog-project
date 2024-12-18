import { blogModel } from "../blog/blog.model";
import { TUser } from "../user/user.interface";
import { userModel } from "../user/user.model";

///Make User Blocked
const makeUserBlockedIntoDBByAdmin = async (
  id: string,
  payload: Partial<TUser>
) => {
  const result = await userModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

//Delete Blog
const deleteBlogFromDBByAdmin = async (id: string) => {
  const result = await blogModel.findByIdAndDelete(id);
  return result;
};

export const adminServices = {
  makeUserBlockedIntoDBByAdmin,
  deleteBlogFromDBByAdmin,
};
