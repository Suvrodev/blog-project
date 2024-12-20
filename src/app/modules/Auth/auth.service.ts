import config from "../../config";
import { userModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const loginUser = async (payload: TLoginUser) => {
  //   console.log("Payloadddd: ", payload);

  //Checking  if the user is exist
  const isUserExists = await userModel.findOne({ email: payload.email });
  if (!isUserExists) {
    throw new Error("User not Found");
  }

  //Check User blocked or not
  const userIsBlocked = isUserExists?.isBlocked;
  if (userIsBlocked) {
    throw new Error("User is Blocked");
  }

  //Check Password is right or wrong
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );
  if (!isPasswordMatched) {
    throw new Error("Password do not matched");
  }

  //Create Token and send to the client
  const jwtPayload = {
    email: isUserExists?.email,
    role: isUserExists?.role,
  };
  const accessToken = Jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: "10d",
  });

  //Access Granted: Send AccessToken, Refresh Token
  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
