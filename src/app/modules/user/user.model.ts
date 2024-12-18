import { Schema, model, connect } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "Password Must be needed"] },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const userModel = model<TUser>("Users", userSchema);
