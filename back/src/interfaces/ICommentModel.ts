import { ClientSession } from "mongoose";
import { IComment } from "./IComment";

export interface ICommentModel {
  create: (body: Partial<IComment>) => Promise<Partial<IComment>>;
  update: (
    filter: Partial<IComment>,
    fieldToUpdate: Partial<IComment>,
  ) => Promise<Partial<IComment> | null>;
  delete: (commentId: string) => Promise<void>;
  findOne: (filter: Partial<IComment>) => Promise<Partial<IComment> | null>;
  findMany: (
    filter: Partial<IComment> | null,
    query: { page: number; limit: number },
  ) => Promise<Array<Partial<IComment>> | null>;
  exists: (filter: Partial<IComment>) => Promise<Boolean>;
  deleteByUserId: (userId: string, session: ClientSession) => Promise<void>;
}
