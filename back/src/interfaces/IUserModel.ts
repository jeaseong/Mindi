import { IUser } from "./IUser";
import { UserModel } from "../models/user";
import { Service } from "typedi";

export interface IUserModel {
  create: (email: string, name: string, password: string) => Promise<Partial<IUser>>;
  update: (filter: Object, fieldToUpdate: Object) => Promise<Partial<IUser>|null>;
  delete: (userId: string) => Promise<void>;
  findOne: (filter: Object) => Promise<Partial<IUser>|null>;
  findMany: (filter: Object) => Promise<Array<Partial<IUser>>|null>;
  exists: (filter: Object) => Promise<Boolean>;
}

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

@Service()
export class TestUserModel implements IUserModel {
  async create(email: string, name: string, password: string) {
    return {
      _id: "asdf1234dfasdf",
      email,
      name
    }
  };

  async update(filter: Object, fieldToUpdate: Object) {
    return {
      _id: "asdf1234dfasdf",
      ...fieldToUpdate
    };
  };

  async delete(userId: string) {
    return;
  }

  async findOne(filter: Object) {
    return {
      _id: "asdf1234dfasdf",
      email: "acorn12345@elice.co.kr",
      name: "acorn",
      password: "asdf1234"
    };
  }

  async findMany(filter: Object) {
    return [
      {
        _id: "asdf1234dfasdf",
        email: "acorn12345@elice.co.kr",
        name: "acorn",
        password: "asdf1234"
      },
      {
        _id: "asdf1234dfaasdf34",
        email: "apple12345@elice.co.kr",
        name: "apple",
        password: "asdf1234"
      }
    ];
  }

  async exists(filter: Object) {
    return true;
  };
}