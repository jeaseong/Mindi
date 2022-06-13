import { Router, Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
// import { userValidator } from "../middlewares/express-validator";
import UserService from "../../services/user";
import { Container } from "typedi";
import { loginRequired } from "../middlewares/loginRequired";

export default (app: Router) => {
  const commentRouter = Router();

  app.use(commentRouter);

  commentRouter.post(
    "/posts/comments/:postId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = {
          success: true,
          comment: null
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
        const body = {
          success: true,
          comments: null
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
        const body = {
          success: true,
          comments: null
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  commentRouter.put(
    "/comments/:commentId",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = {
          success: true,
          comment: null
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
        const body = {
          success: true,
          message: null
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });
}