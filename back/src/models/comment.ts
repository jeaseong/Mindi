import mongoose, { ClientSession } from "mongoose";
import { IComment } from "../interfaces/IComment";
import { ICommentModel } from "../interfaces/ICommentModel";
import { Service } from "typedi";

export const Comment = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    depth: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export const CommentModel = mongoose.model<IComment>("Comment", Comment);

@Service()
export class MongoCommentModel implements ICommentModel {
  async create(body: Partial<IComment>) {
    const comment = await CommentModel.create(body);
    return comment.toObject();
  }
  async update(filter: Object, fieldToUpdate: Object) {
    return CommentModel.findOneAndUpdate(
      filter,
      { $set: fieldToUpdate },
      { returnOriginal: false },
    ).lean();
  }
  async delete(commentId: string) {
    await CommentModel.deleteOne({ _id: commentId });
  }
  async findOne(filter: Object) {
    return CommentModel.findOne(filter).lean();
  }
  async findMany(filter: Object | null, query: { page: number; limit: number }) {
    if (filter === null) {
      return CommentModel.find()
        .sort({ createdAt: 1 })
        .limit(query.limit)
        .skip((query.page - 1) * query.limit)
        .lean();
    } else {
      return CommentModel.find(filter)
        .sort({ createdAt: 1 })
        .limit(query.limit)
        .skip((query.page - 1) * query.limit)
        .lean();
    }
  }
  async exists(filter: Object) {
    const res = CommentModel.exists(filter).lean();
    return !!res;
  }
  async deleteByUserId(userId: string, session: ClientSession): Promise<void> {
    await CommentModel.deleteMany({ author: userId }).session(session);
  }
  async deleteByPostId(postId: string, session: ClientSession): Promise<void> {
    await CommentModel.deleteMany({ post: postId }).session(session);
  }
}
