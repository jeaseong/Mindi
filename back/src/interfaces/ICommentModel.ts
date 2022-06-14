import { IComment } from "./IComment";

export interface ICommentModel {
  create: (post: string, content: string, author: string) => Promise<Partial<IComment>>;
  update: (filter: Object, fieldToUpdate: Object) => Promise<Partial<IComment>|null>;
  delete: (commentId: string) => Promise<void>;
  findOne: (filter: Object) => Promise<Partial<IComment>|null>;
  findMany: (filter: Object | null, query: { page: number, limit: number }) => Promise<Array<Partial<IComment>>|null>;
  exists: (filter: Object) => Promise<Boolean>;
}