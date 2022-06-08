import { IUser } from "./IUser";
import { UserModel } from "../models/user";
import { Service } from "typedi";

export interface IUserModel {
  create: (email: string, name: string, password: string) => Promise<IUser>;
  update: (filter: Object, fieldToUpdate: Object) => Promise<IUser>;
  delete: (userId: string) => Promise<void>;
  findOne: (filter: Object) => Promise<IUser>;
  findMany: (filter: Object) => Promise<Array<IUser>>;
  exists: (filter: Object) => Promise<Boolean>;
}

@Service()
export class MongoUserModel implements IUserModel {
  async create(email: string, name: string, password: string) {
    const user = await UserModel.create({email, name, password});

    return user.toJSON();
  };

  async update(filter: Object, fieldToUpdate: Object) {
    const user = await UserModel.findOneAndUpdate(
      filter,
      { $set: fieldToUpdate },
      { returnOriginal: false, timestamps: false }
    ).lean();

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
      name: "acorn"
    };
  }

  async findMany(filter: Object) {
    return [
      {
        _id: "asdf1234dfasdf",
        email: "acorn12345@elice.co.kr",
        name: "acorn"
      },
      {
        _id: "asdf1234dfaasdf34",
        email: "apple12345@elice.co.kr",
        name: "apple"
      }
    ];
  }

  async exists(filter: Object) {
    const itExists = await UserModel.exists(filter) as unknown as Boolean;
    return itExists;
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