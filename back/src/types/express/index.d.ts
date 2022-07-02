import { IUser } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<IUser>;
    }
    interface User extends IUser {}
  }
}