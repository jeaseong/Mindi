import { ClientSession } from "mongoose";
import { IPost } from "./IPost";

export interface IPostModel {
  create: (body: Partial<IPost>) => Promise<Partial<IPost>>;
  update: (filter: Partial<IPost>, fieldToUpdate: Partial<IPost>) => Promise<Partial<IPost> | null>;
  delete: (postId: string, session: ClientSession) => Promise<void>;
  findOne: (filter: Partial<IPost>) => Promise<Partial<IPost> | null>;
  findMany: (
    filter: Partial<IPost> | null,
    query: { page: number; limit: number },
  ) => Promise<Array<Partial<IPost>> | null>;
  exists: (filter: Partial<IPost>) => Promise<Boolean>;
  deleteByUserId: (userId: string, session: ClientSession) => Promise<void>;
}
