import mongoose, { ClientSession } from "mongoose";
import { IPost } from "../interfaces/IPost";
import { IPostModel } from "../interfaces/IPostModel";
import { Service } from "typedi";

export const Post = new mongoose.Schema(
  {
    title: {
      type: String,
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
    comments: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export const PostModel = mongoose.model<IPost>("Post", Post);

@Service()
export class MongoPostModel implements IPostModel {
  async create(body: Partial<IPost>) {
    const post = await PostModel.create(body);
    return post.toObject();
  }
  async update(filter: Object, fieldToUpdate: Object) {
    return PostModel.findOneAndUpdate(
      filter,
      { $set: fieldToUpdate },
      { returnOriginal: false },
    ).lean();
  }
  async delete(postId: string, session: ClientSession) {
    await PostModel.deleteOne({ _id: postId }).session(session);
  }
  async findOne(filter: Object) {
    return PostModel.findOne(filter).lean();
  }
  async findMany(filter: Object | null, query: { page: number; limit: number }) {
    if (filter === null) {
      return PostModel.find()
        .sort({ createdAt: -1 })
        .limit(query.limit)
        .skip((query.page - 1) * query.limit)
        .lean();
    } else {
      return PostModel.find(filter)
        .sort({ createdAt: -1 })
        .limit(query.limit)
        .skip((query.page - 1) * query.limit)
        .lean();
    }
  }
  async exists(filter: Object) {
    const res = PostModel.exists(filter).lean();
    return !!res;
  }
  async deleteByUserId(userId: string, session: ClientSession): Promise<void> {
    await PostModel.deleteMany({ author: userId }).session(session);
  }
}
