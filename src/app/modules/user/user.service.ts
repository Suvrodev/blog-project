import { TUser } from "./user.interface";
import { userModel } from "./user.model";

///Create Student into db
const registerUserIntoDB = async (payload: TUser) => {
  console.log("Payload: ", payload);
  const result = await userModel.create(payload);
  return result;
};

export const userServices = {
  registerUserIntoDB,
};
