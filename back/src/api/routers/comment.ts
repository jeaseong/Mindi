import { Router, Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { Container } from "typedi";
import commentValidator from "../middlewares/express-validator/comment";
import { loginRequired } from "../middlewares/loginRequired";
import CommentService from "../../services/comment";
import { StatusError } from "../../utils/error";
import validationErrorChecker from "../middlewares/validationErrorChecker";

export default (app: Router) => {
  const commentRouter = Router();

  app.use(commentRouter);

  commentRouter.post(
    "/posts/comments/:postId",
    loginRequired,
    commentValidator.uploadBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { postId } = req.params;
        const { content } = matchedData(req);
        const author = req.user!._id;
        const commentService = Container.get(CommentService);

        const comment = await commentService.makeNewComment(postId, content, author);
        const { updatedAt, ...rest } = comment;

        const body = {
          success: true,
          comment: rest
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  commentRouter.get(
    "/comments/:commentId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { commentId } = req.params;

        const commentService = Container.get(CommentService);

        const comment = await commentService.getOneCommentByCommentId(commentId);
        const { updatedAt, ...rest } = comment!;

        const body = {
          success: true,
          comments: rest
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  commentRouter.get(
    "/posts/comments/:postId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { postId } = req.params;
        const page = req.query.page as unknown as number || 1;
        const limit = req.query.limit as unknown as number || 5;

        const commentService = Container.get(CommentService);

        const comments = await commentService.getCommentsWithFilter({ post: postId }, page, limit);
        const reducedComments = comments.map((comment) => {
          const { updatedAt, ...rest } = comment;
          return rest;
        });

        const body = {
          success: true,
          comments: reducedComments
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  commentRouter.get(
    "/users/comments/:userId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.params;
        const page = req.query.page as unknown as number || 1;
        const limit = req.query.limit as unknown as number || 5;

        const commentService = Container.get(CommentService);

        const comments = await commentService.getCommentsWithFilter({ author: userId }, page, limit);
        const reducedComments = comments.map((comment) => {
          const { updatedAt, ...rest } = comment;
          return rest;
        });

        const body = {
          success: true,
          comments: reducedComments
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  commentRouter.put(
    "/comments/:commentId",
    loginRequired,
    commentValidator.modifyingBody,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { commentId } = req.params;
        const userId = req.user!._id;
        const fieldToUpdate = matchedData(req);

        const commentService = Container.get(CommentService);

        const comment = await commentService.getOneCommentByCommentId(commentId);

        if (comment!.author.toString() !== userId.toString())
          throw new StatusError(401, "수정 권한이 없습니다.");

        const updatedComment = await commentService.updateCommentInfo(commentId, fieldToUpdate);

        const body = {
          success: true,
          comment: updatedComment
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  commentRouter.delete(
    "/comments/commentId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { commentId } = req.params;
        const userId = req.user!._id;

        const commentService = Container.get(CommentService);

        const comment = await commentService.getOneCommentByCommentId(commentId);

        if (comment!.author.toString() !== userId.toString())
          throw new StatusError(401, "삭제 권한이 없습니다.");

        await commentService.deleteComment(commentId);

        const body = {
          success: true,
          message: "성공적으로 삭제되었습니다."
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });
}