import { Service, Inject } from "typedi";
import { UserModel } from "../models/user";
import { StatusError } from "../utils/error";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/IUser";

// type AuthDependencies = {
//   userModel: typeof UserModel;
// };

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private userModel: typeof UserModel
  ) {
  }

  public async localSignUp(email: string, name: string, password: string) {
    const emailExists = await this.userModel.exists({ email: email });

    if (emailExists) {
      throw new StatusError(
        400,
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    // 비밀번호 해시화
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: IUser = await this.userModel.create({
      email,
      name,
      password: hashedPassword
    });

    return newUser;
  }
}