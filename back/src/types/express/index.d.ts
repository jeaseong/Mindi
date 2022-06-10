import { IUser } from "../../interfaces/IUser";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<IUser>;
    }
    interface User extends IUser {}
  }
}