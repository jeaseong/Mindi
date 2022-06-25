import { IUser } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<IUser> | undefined;
    }
    interface User extends IUser {}
  }
}