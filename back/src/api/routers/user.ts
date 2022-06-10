import { Router, Request, Response, NextFunction } from "express";
import { body, matchedData } from "express-validator";
import { userValidator } from "../middlewares/express-validator";
import UserService from "../../services/user";
import { Container } from "typedi";
import { loginRequired } from "../middlewares/loginRequired";

export default (app: Router) => {
  const userRouter = Router();

  app.use("/users", userRouter);

  userRouter.get(
    "/",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;

        const userService = Container.get(UserService);
        const user = await userService.getUserInfo(userId);

        const body = {
          success: true,
          user: {
            _Id: user!._id,
            email: user!.email,
            name: user!.name,
            recentLogin: user!.recentLogin
          }
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
  });

  userRouter.put(
    "/",
    loginRequired,
    userValidator.userUpdateBody,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;
        const fieldToUpdate = matchedData(req);

        const userService = Container.get(UserService);
        const updatedUser = await userService.updateUserInfo(
          userId,
          fieldToUpdate
        );

        const body = {
          success: true,
          user: {
            name: "name"
          },
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    });

  userRouter.delete(
    "/",
    loginRequired,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;

        const userService = Container.get(UserService);
        await userService.deleteUser(userId);

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