import mongoose, { ClientSession } from "mongoose";
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
      required: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: "user",
    },
    colorScheme: {
      fear: {
        type: String,
        default: "#d9c7c7",
      },
      surprised: {
        type: String,
        default: "#b00067",
      },
      anger: {
        type: String,
        default: "#cef550",
      },
      sadness: {
        type: String,
        default: "#f65469",
      },
      happiness: {
        type: String,
        default: "#b7c6c9",
      },
      aversion: {
        type: String,
        default: "#3399ff",
      },
      required: false,
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
    const user = await UserModel.create({ email, name, password });
    return user.toObject();
  }
  async update(filter: Object, fieldToUpdate: Object) {
    return UserModel.findOneAndUpdate(
      filter,
      { $set: fieldToUpdate },
      { returnOriginal: false, timestamps: false },
    ).lean();
  }
  async delete(userId: string, session: ClientSession) {
    await UserModel.deleteOne({ _id: userId }).session(session);
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
  }
}
