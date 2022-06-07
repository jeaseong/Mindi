import mongoose from 'mongoose';
import { IUser } from "../interfaces/IUser";

const User = new mongoose.Schema(
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

  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUser & mongoose.Document>("User", User);