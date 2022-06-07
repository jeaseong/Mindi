import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import { Container } from "typedi";
import { UserModel } from "../models/user";

export default async ({ expressApp } : { expressApp : any }) => {
  await mongooseLoader();

  Container.set("userModel", UserModel);

  await expressLoader({ app: expressApp });
}