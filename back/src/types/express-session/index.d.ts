import { IUser } from "../../interfaces/IUser";

export {}

declare module "express-session" {
  interface SessionData {
    authorized: boolean;
    user: Partial<IUser>;
  }
}