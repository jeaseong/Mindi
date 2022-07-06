import { ClientSession } from "mongoose";
import { IUser } from "./IUser";

export interface IUserModel {
  create: (email: string, name: string, password: string) => Promise<Partial<IUser>>;
  update: (filter: Partial<IUser>, fieldToUpdate: Partial<IUser>) => Promise<Partial<IUser> | null>;
  delete: (userId: string, session: ClientSession) => Promise<void>;
  findOne: (filter: Partial<IUser>) => Promise<Partial<IUser> | null>;
  findMany: (filter: Partial<IUser>) => Promise<Array<Partial<IUser>> | null>;
  exists: (filter: Partial<IUser>) => Promise<Boolean>;
}
