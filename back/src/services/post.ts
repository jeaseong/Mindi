import { Service, Inject } from "typedi";
import { StatusError } from "../utils/error";
import { MongoPostModel } from "../models/post";

@Service()
export default class PostService {
  constructor(
    private postModel: MongoPostModel
  ) {
  }
  public async makeNewPost(title: string, content: string, author: string) {
    return this.postModel.create(title, content, author);
  }

  public async getPostInfo(postId: string, page: number, limit: number) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(
        400,
        "사용자가 존재하지 않습니다."
      );
    }

    return this.userModel.findOne({ _id: userId });
  }

  public async updateUserInfo(userId: string, fieldToUpdate: Object) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(
        400,
        "사용자가 존재하지 않습니다."
      );
    }

    return this.userModel.update({ _id: userId }, fieldToUpdate);
  }

  public async deleteUser(userId: string) {
    const userExists = await this.userModel.exists({ _id: userId });

    if (!userExists) {
      throw new StatusError(
        400,
        "사용자가 존재하지 않습니다."
      );
    }

    return this.userModel.delete(userId);
  }
}