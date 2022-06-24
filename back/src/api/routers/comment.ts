import { Router, Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { Container } from "typedi";
import commentValidator from "../middlewares/express-validator/comment";
import { loginRequired } from "../middlewares/loginRequired";
import CommentService from "../../services/comment";
import { StatusError } from "../../utils/error";
import validationErrorChecker from "../middlewares/validationErrorChecker";
import PostService from "../../services/post";
import {IResponse} from "../../interfaces/IResponse";
import {IComment} from "../../interfaces/IComment";

export default (app: Router) => {
  const commentRouter = Router();

  app.use(commentRouter);

  commentRouter.post(
    "/comments/:commentId",
    loginRequired,
    commentValidator.uploadBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { commentId } = req.params;
        const { content } = matchedData(req);
        const author = req.user!._id;

        const commentService = Container.get(CommentService);
        const postService = Container.get(PostService);

        const parent = await commentService.getOneCommentByCommentId(commentId);
        // 이 댓글은 n차 대댓글임
        const depth = parent!.depth + 1;

        // 새로운 댓글 등록
        const comment = await commentService.makeNewComment({
          post: parent!.post,
          parent: commentId,
          depth,
          content,
          author
        });

        // 게시물 댓글수 1 증가
        const post = await postService.getOnePostByPostId(parent!.post);
        await postService.updatePostInfo(post!._id, { comments: post!.comments + 1 });

        const { updatedAt, ...rest } = comment;

        const response: IResponse<IComment> = {
          success: true,
          result: rest
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

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
        const postService = Container.get(PostService);

        const comment = await commentService.makeNewComment({
          post: postId,
          depth: 0,
          content,
          author
        });

        // 게시글 댓글수 1 증가
        const post = await postService.getOnePostByPostId(postId);
        await postService.updatePostInfo(postId, { comments: post!.comments + 1 });

        const { updatedAt, ...rest } = comment;

        const response: IResponse<IComment> = {
          success: true,
          result: rest
        };

        res.status(200).json(response);
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

        const response: IResponse<IComment> = {
          success: true,
          result: rest
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

  commentRouter.get(
    "/comments/children/:commentId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { commentId } = req.params;
        const page = req.query.page as unknown as number || 1;
        const limit = req.query.limit as unknown as number || 5;

        const commentService = Container.get(CommentService);

        const comments = await commentService.getCommentsWithFilter({ parent: commentId }, page, limit);
        const reducedComments = comments.map((comment) => {
          const { updatedAt, ...rest } = comment;
          return rest;
        });

        const response: IResponse<Partial<IComment>[]> = {
          success: true,
          result: reducedComments
        };

        res.status(200).json(response);
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

        const comments = await commentService.getCommentsWithFilter({ post: postId, depth: 0 }, page, limit);
        const reducedComments = comments.map((comment) => {
          const { updatedAt, ...rest } = comment;
          return rest;
        });

        const response: IResponse<Partial<IComment>[]> = {
          success: true,
          result: reducedComments
        };

        res.status(200).json(response);
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

        const response: IResponse<Partial<IComment>[]> = {
          success: true,
          result: reducedComments
        };

        res.status(200).json(response);
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
        const { updatedAt, ...rest } = updatedComment!;

        const response: IResponse<IComment> = {
          success: true,
          result: rest
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

  commentRouter.delete(
    "/comments/:commentId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { commentId } = req.params;
        const userId = req.user!._id;

        const commentService = Container.get(CommentService);
        const postService = Container.get(PostService);

        const comment = await commentService.getOneCommentByCommentId(commentId);

        if (comment!.author.toString() !== userId.toString())
          throw new StatusError(401, "삭제 권한이 없습니다.");

        // 원본 게시글의 댓글수 1 감소
        const post = await postService.getOnePostByPostId(comment!.post);
        await postService.updatePostInfo(post!._id, { comments: post!.comments - 1 });

        await commentService.deleteComment(commentId);

        const response: IResponse<string> = {
          success: true,
          result: "성공적으로 삭제되었습니다."
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });
}