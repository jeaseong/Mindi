import { Inject, Service } from "typedi";
import { ClientSession } from "mongoose";
import { StatusError, setResetPasswordMail, runTransaction } from "../utils";
import {
  MongoUserModel,
  MongoDiaryModel,
  MongoStatModel,
  MongoCommentModel,
  MongoPostModel,
} from "../models";
import winston from "winston";
import transporter from "../loaders/smtpTransporter";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces";

@Service()
export default class UserService {
  constructor(
    private userModel: MongoUserModel,
    private statModel: MongoStatModel,
    private diaryModel: MongoDiaryModel,
    private commentModel: MongoCommentModel,
    private postModel: MongoPostModel,
    @Inject("logger") private logger: winston.Logger,
  ) {}

  public async getUserInfo(userId: string) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(400, "사용자가 존재하지 않습니다.");
    }

    return this.userModel.findOne({ _id: userId });
  }

  public async updateUserInfo(userId: string, fieldToUpdate: Partial<IUser>) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(400, "사용자가 존재하지 않습니다.");
    }

    if (fieldToUpdate.hasOwnProperty("password")) {
      // 비밀번호 해시화
      console.log(fieldToUpdate.password);
      fieldToUpdate.password = await bcrypt.hash(fieldToUpdate.password!, 10);
      console.log(fieldToUpdate.password);
    }

    return this.userModel.update({ _id: userId }, fieldToUpdate);
  }

  public async deleteUser(userId: string) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(400, "사용자가 존재하지 않습니다.");
    }

    const txnFunc = async (session: ClientSession) => {
      await this.userModel.delete(userId, session);
      await this.diaryModel.deleteByUserId(userId, session);
      await this.statModel.deleteByUserId(userId, session);
      await this.postModel.deleteByUserId(userId, session);
      await this.commentModel.deleteByUserId(userId, session);
    };

    return runTransaction(txnFunc);
  }

  public async resetPassword(email: string) {
    try {
      const tempPassword = crypto.randomBytes(10).toString("base64");
      const hashedPassword: string = await bcrypt.hash(tempPassword, 10);
      const userInfo = await this.userModel.update({ email }, { password: hashedPassword });
      return { userInfo, tempPassword };
    } catch (error) {
      throw new StatusError(400, "비밀번호 초기화에 실패하였습니다.");
    }
  }

  public async sendMail(email: string, name: string, tempPassword: string) {
    try {
      const mailOptions = await setResetPasswordMail(email, name, tempPassword);
      await transporter.sendMail(mailOptions);
      await transporter.close();
    } catch (error) {
      throw new StatusError(400, "이메일 전송에 실패하였습니다.");
    }
  }
}
