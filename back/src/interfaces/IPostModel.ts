import { IPost } from "./IPost";

export interface IPostModel {
  create: (body: Partial<IPost>) => Promise<Partial<IPost>>;
  update: (filter: Object, fieldToUpdate: Object) => Promise<Partial<IPost>|null>;
  delete: (postId: string) => Promise<void>;
  findOne: (filter: Object) => Promise<Partial<IPost>|null>;
  findMany: (filter: Object | null, query: { page: number, limit: number }) => Promise<Array<Partial<IPost>>|null>;
  exists: (filter: Object) => Promise<Boolean>;
}