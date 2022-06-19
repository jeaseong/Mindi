import { ExtractJwt, Strategy } from "passport-jwt";
import config from "../../../../config";
import { IUserModel } from "../../../../interfaces/IUserModel";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecretKey,
  jsonWebTokenOptions: {
    maxAge: config.jwtExpirationDate
  }
};

export default (userModel: IUserModel) => {
  return new Strategy(options, async (payload, done) => {
    try {
      const userId = payload._id;

      // db에 유저가 존재하는지 검사
      const userExists = await userModel.exists({ _id: userId });

      // 만약 존재하지 않으면
      if (!userExists) {
        // 없다는 것을 알림
        return done(null, false);
      }

      // 존재한다면 유저 정보를 불러와서
      const user = await userModel.findOne({ _id: userId });

      // 라우터로 전달함
      return done(null, user);

    } catch (error) {
      return done(error);
    }
  });
};