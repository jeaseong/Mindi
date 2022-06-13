import mongoose from 'mongoose';
import { IPost } from "../interfaces/IPost";
import { IPostModel } from "../interfaces/IPostModel";
import { Service } from "typedi";

export const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
}, { timestamps: true });

export const PostModel = mongoose.model<IPost>("Post", Post);

@Service()
export class MongoPostModel implements IPostModel {
  async create(title: string, content: string, author: string) {
    const post = await PostModel.create({ title, content, author });
    return post.toObject();
  };
  async update(filter: Object, fieldToUpdate: Object) {
    return PostModel.findOneAndUpdate(
      filter,
      { $set: fieldToUpdate },
      { returnOriginal: false }
    );
  };
  async delete(postId: string) {
    await PostModel.deleteOne({ _id: postId });
  };
  async findOne(filter: Object) {
    return PostModel.findOne(filter).lean();
  };
  async findMany(filter: Object) {
    return PostModel.find(filter).lean();
  };
  async exists(filter: Object) {
    const res = PostModel.exists(filter).lean();
    return !!res;
  };
}