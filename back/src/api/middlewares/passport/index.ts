import passport from "passport";
import jwtStrategy from "./strategies/jwt";
import localStrategy from "./strategies/local";
import { Container, Service } from "typedi";
import { MongoUserModel } from "../../../models/user";

@Service()
class StrategyManager {
  constructor(
    private userModel: MongoUserModel
  ) {
  }

  public load() {
    passport.use("localStrategy", localStrategy(this.userModel));
    passport.use("jwtStrategy", jwtStrategy(this.userModel));
  }

  public serializeUser() {
    passport.serializeUser((user: Express.User, done) => {
      done(null, user._id);
    });
  }

  public deserializeUser() {
    passport.deserializeUser(async (userId: string, done) => {
      try {
        const user = await this.userModel.findOne({ _id: userId }) as Express.User;

        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  }
}

export default () => {
  const strategyManager = Container.get(StrategyManager);

  strategyManager.load();
  strategyManager.serializeUser();
  strategyManager.deserializeUser();

  return passport;
};