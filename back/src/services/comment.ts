import { Service, Inject } from "typedi";
import { StatusError } from "../utils/error";
import { MongoCommentModel } from "../models/comment";
import { IComment } from "../interfaces/IComment";
import winston from "winston";

@Service()
export default class CommentService {
  constructor(
    private commentModel: MongoCommentModel,
    @Inject("logger") private logger: winston.Logger
  ) {
  }
  public async makeNewComment(body: Partial<IComment>) {
    return this.commentModel.create(body);
  }

  public async getCommentsWithFilter(filter: Object | null, page: number, limit: number) {
    return this.commentModel.findMany(filter, { page, limit });
  }

  public async getOneCommentByCommentId(commentId: string) {
    const commentExists = await this.commentModel.exists({ _id: commentId });

    if (!commentExists) {
      throw new StatusError(
        400,
        "댓글이 존재하지 않습니다."
      );
    }

    return this.commentModel.findOne({ _id: commentId });
  }

  public async updateCommentInfo(commentId: string, fieldToUpdate: Object) {
    const commentExists = await this.commentModel.exists({ _id: commentId });

    if (!commentExists) {
      throw new StatusError(
        400,
        "댓글이 존재하지 않습니다."
      );
    }

    return this.commentModel.update({ _id: commentId }, fieldToUpdate);
  }

  public async deleteComment(commentId: string) {
    const commentExists = await this.commentModel.exists({ _id: commentId });

    if (!commentExists) {
      throw new StatusError(
        400,
        "댓글이 존재하지 않습니다."
      );
    }

    await this.commentModel.delete(commentId);
  }
}