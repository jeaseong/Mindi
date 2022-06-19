import { Router, Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import PostService from "../../services/post";
import { Container } from "typedi";
import { loginRequired } from "../middlewares/loginRequired";
import { postValidator } from "../middlewares/express-validator";
import validationErrorChecker from "../middlewares/validationErrorChecker";
import { StatusError } from "../../utils/error";
import { IResponse } from "../../interfaces/IResponse";
import { IPost } from "../../interfaces/IPost";

export default (app: Router) => {
  const postRouter = Router();

  app.use(postRouter);

  postRouter.post(
    "/posts",
    loginRequired,
    postValidator.uploadBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { title, content } = matchedData(req);
        const author = req.user!._id;

        const postService = Container.get(PostService);

        const post = await postService.makeNewPost({ title, content, author });
        const { updatedAt, ...rest } = post;

        const response: IResponse<Partial<IPost>> = {
          success: true,
          result: rest
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

  postRouter.get(
    "/posts",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const page = req.query.page as unknown as number || 1;
        const limit = req.query.limit as unknown as number || 5;

        const postService = Container.get(PostService);

        const posts = await postService.getPostsWithFilter(null, page, limit);
        const reducedPosts = posts.map((post) => {
          const { updatedAt, ...rest } = post;
          return rest;
        });

        const response: IResponse<Partial<IPost>[]> = {
          success: true,
          result: reducedPosts
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

  postRouter.get(
    "/posts/:postId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { postId } = req.params;

        const postService = Container.get(PostService);

        const post = await postService.getOnePostByPostId(postId);
        const { updatedAt, ...rest } = post!;

        const response: IResponse<Partial<IPost>> = {
          success: true,
          result: rest
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

  postRouter.get(
    "/users/posts",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const page = req.query.page as unknown as number || 1;
        const limit = req.query.limit as unknown as number || 5;
        const userId = req.user!._id;

        const postService = Container.get(PostService);

        const posts = await postService.getPostsWithFilter({ author: userId }, page, limit);
        const reducedPosts = posts.map((post) => {
          const { updatedAt, ...rest } = post;
          return rest;
        });

        const response: IResponse<Partial<IPost>[]> = {
          success: true,
          result: reducedPosts
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

  postRouter.get(
    "/users/posts/:userId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.params;

        const page = req.query.page as unknown as number || 1;
        const limit = req.query.limit as unknown as number || 5;

        const postService = Container.get(PostService);

        const posts = await postService.getPostsWithFilter({ author: userId }, page, limit);
        const reducedPosts = posts.map((post) => {
          const { updatedAt, ...rest } = post;
          return rest;
        });

        const response: IResponse<Partial<IPost>[]> = {
          success: true,
          result: reducedPosts
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

  postRouter.put(
    "/posts/:postId",
    loginRequired,
    postValidator.modifyingBody,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { postId } = req.params;
        const userId = req.user!._id;
        const fieldToUpdate = matchedData(req);

        const postService = Container.get(PostService);

        const post = await postService.getOnePostByPostId(postId);

        if (post!.author.toString() !== userId.toString())
          throw new StatusError(401, "수정 권한이 없습니다.");

        const updatedPost = await postService.updatePostInfo(postId, fieldToUpdate);
        const { updatedAt, ...rest } = updatedPost!;

        const response: IResponse<Partial<IPost>> = {
          success: true,
          result: rest
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

  postRouter.delete(
    "/posts/:postId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { postId } = req.params;
        const userId = req.user!._id;

        const postService = Container.get(PostService);

        const post = await postService.getOnePostByPostId(postId);

        if (post!.author.toString() !== userId.toString())
          throw new StatusError(401, "삭제 권한이 없습니다.");

        await postService.deletePost(postId);

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