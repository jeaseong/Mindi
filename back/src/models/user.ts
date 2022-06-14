import mongoose from 'mongoose';
import { IUser } from "../interfaces/IUser";
import { Service } from "typedi";
import { IUserModel } from "../interfaces/IUserModel";

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

@Service()
export class MongoUserModel implements IUserModel {
  async create(email: string, name: string, password: string) {
    const user = await UserModel.create({email, name, password});
    return user.toObject();
  };
  async update(filter: Object, fieldToUpdate: Object) {
    return UserModel.findOneAndUpdate(
      filter,
      { $set: fieldToUpdate },
      { returnOriginal: false, timestamps: false }
    ).lean();
  };
  async delete(userId: string) {
    await UserModel.deleteOne({ _id: userId });
  }
  async findOne(filter: Object) {
    return UserModel.findOne(filter).lean();
  }
  async findMany(filter: Object) {
    return UserModel.find(filter).lean();
  }
  async exists(filter: Object) {
    const res = await UserModel.exists(filter);
    return !!res;
  };
}