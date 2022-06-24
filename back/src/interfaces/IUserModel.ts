import { IUser } from "./IUser";

export interface IUserModel {
  create: (email: string, name: string, password: string) => Promise<Partial<IUser>>;
  update: (filter: Object, fieldToUpdate: Object) => Promise<Partial<IUser>|null>;
  delete: (userId: string) => Promise<void>;
  findOne: (filter: Object) => Promise<Partial<IUser>|null>;
  findMany: (filter: Object) => Promise<Array<Partial<IUser>>|null>;
  exists: (filter: Object) => Promise<Boolean>;
}