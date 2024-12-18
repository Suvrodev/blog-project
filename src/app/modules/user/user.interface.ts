import { Schema, model, connect } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "User";
  isBlocked: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
};
