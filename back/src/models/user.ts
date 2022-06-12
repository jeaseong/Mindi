import mongoose from 'mongoose';
import { IUser } from "../interfaces/IUser";

export const User = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: true
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: false
    },
    role: {
      type: String,
      default: "user",
    },
    recentLogin: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUser>("User", User);