import { Inject, Service } from "typedi";
import { StatusError, setResetPasswordMail } from "../utils";
import { MongoUserModel } from "../models/user";
import winston from "winston";
import transporter from "../loaders/email";
import crypto from "crypto";
import bcrypt from "bcrypt";

@Service()
export default class UserService {
  constructor(
    private userModel: MongoUserModel,
    @Inject("logger") private logger: winston.Logger,
  ) {}

  public async getUserInfo(userId: string) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(400, "사용자가 존재하지 않습니다.");
    }

    return this.userModel.findOne({ _id: userId });
  }

  public async updateUserInfo(userId: string, fieldToUpdate: Object) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(400, "사용자가 존재하지 않습니다.");
    }

    return this.userModel.update({ _id: userId }, fieldToUpdate);
  }

  public async deleteUser(userId: string) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(400, "사용자가 존재하지 않습니다.");
    }

    return this.userModel.delete(userId);
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
