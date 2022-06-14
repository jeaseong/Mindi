import { IComment } from "./IComment";

export interface ICommentModel {
  create: (postId: string, content: string) => Promise<Partial<IComment>>;
  update: (filter: Object, fieldToUpdate: Object) => Promise<Partial<IComment>|null>;
  delete: (commentId: string) => Promise<void>;
  findOne: (filter: Object) => Promise<Partial<IComment>|null>;
  findMany: (filter: Object) => Promise<Array<Partial<IComment>>|null>;
  exists: (filter: Object) => Promise<Boolean>;
}