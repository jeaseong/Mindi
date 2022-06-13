import { Router, Request, Response, NextFunction } from "express";
import { body, matchedData } from "express-validator";
import { userValidator } from "../middlewares/express-validator";
import UserService from "../../services/user";
import { Container } from "typedi";
import { loginRequired } from "../middlewares/loginRequired";

export default (app: Router) => {
  const postRouter = Router();

  app.use(postRouter);


  // TODO 게시글 업로드
  postRouter.post(
    "/posts",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = {
          success: true,
          post: null
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  // TODO 게시글 목록 표시(쿼리 필요)
  postRouter.get(
    "/posts",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = {
          success: true,
          posts: null
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  // TODO id에 해당하는 게시글 정보 취득
  postRouter.get(
    "/posts/:postId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = {
          success: true,
          posts: null
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  // TODO 로그인한 본인의 게시글 목록 취득
  postRouter.get(
    "/users/posts",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = {
          success: true,
          posts: null
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  // TODO id에 해당하는 유저의 게시글 목록 취득
  postRouter.get(
    "/users/posts/:userId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = {
          success: true,
          posts: null
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  // TODO id에 해당하는 게시글 수정
  postRouter.put(
    "/posts/:postId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = {
          success: true,
          posts: null
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  // TODO id에 해당하는 게시글 삭제
  postRouter.delete(
    "/posts/:postId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
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