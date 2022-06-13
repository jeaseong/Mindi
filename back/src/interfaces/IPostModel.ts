import { IPost } from "./IPost";

export interface IPostModel {
  create: (title: string, content: string) => Promise<Partial<IPost>>;
  update: (filter: Object, fieldToUpdate: Object) => Promise<Partial<IPost>|null>;
  delete: (userId: string) => Promise<void>;
  findOne: (filter: Object) => Promise<Partial<IPost>|null>;
  findMany: (filter: Object) => Promise<Array<Partial<IPost>>|null>;
  exists: (filter: Object) => Promise<Boolean>;
}