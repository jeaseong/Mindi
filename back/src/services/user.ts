import {Inject, Service} from "typedi";
import { StatusError } from "../utils/error";
import { MongoUserModel } from "../models/user";
import winston from "winston";

@Service()
export default class UserService {
  constructor(
    private userModel: MongoUserModel,
    @Inject("logger") private logger: winston.Logger
  ) {
  }

  public async getUserInfo(userId: string) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(
        400,
        "사용자가 존재하지 않습니다."
      );
    }

    return this.userModel.findOne({ _id: userId });
  }

  public async updateUserInfo(userId: string, fieldToUpdate: Object) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(
        400,
        "사용자가 존재하지 않습니다."
      );
    }

    return this.userModel.update({ _id: userId }, fieldToUpdate);
  }

  public async deleteUser(userId: string) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(
        400,
        "사용자가 존재하지 않습니다."
      );
    }

    return this.userModel.delete(userId);
  }
}