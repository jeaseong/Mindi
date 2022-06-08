import { Container } from "typedi";
import { TestUserModel, MongoUserModel } from "../interfaces/IUserModel";

export default () => {
  Container.set("mongoUserModel", MongoUserModel);
  // Container.set("testUserModel", TestUserModel);
};