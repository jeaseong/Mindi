import { Router, Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { userValidator } from "../middlewares/express-validator";
import { UserService } from "../../services";
import { Container } from "typedi";
import { checkAuth } from "../middlewares";
import { IUser, IResponse } from "../../interfaces";
import { validationErrorChecker } from "../middlewares";

export default (app: Router) => {
  const userRouter = Router();

  app.use("/users", userRouter);

  userRouter.get("/", checkAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = <string>req.user!._id;

      const userService = Container.get(UserService);
      const user = await userService.getUserInfo(userId);

      const response: IResponse<IUser> = {
        success: true,
        result: {
          _id: user!._id,
          email: user!.email,
          name: user!.name,
          recentLogin: user!.recentLogin,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  userRouter.put(
    "/",
    checkAuth,
    userValidator.userUpdateBody,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = <string>req.user!._id;
        const fieldToUpdate = matchedData(req);

        const userService = Container.get(UserService);
        const updatedUser = await userService.updateUserInfo(userId, fieldToUpdate);

        const response: IResponse<IUser> = {
          success: true,
          result: {
            _id: updatedUser!._id,
            email: updatedUser!.email,
            name: updatedUser!.name,
            recentLogin: updatedUser!.recentLogin,
          },
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  userRouter.delete("/", checkAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = <string>req.user!._id;

      const userService = Container.get(UserService);
      await userService.deleteUser(userId);

      const response: IResponse<string> = {
        success: true,
        result: "성공적으로 삭제되었습니다.",
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  userRouter.post(
    "/password-reset",
    userValidator.checkEmail,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email } = matchedData(req);

        const userService = Container.get(UserService);
        const { userInfo, tempPassword } = await userService.resetPassword(email);
        await userService.sendMail(userInfo!.email, userInfo!.name, tempPassword);

        const response: IResponse<string> = {
          success: true,
          result: "임시 비밀번호가 발급되었습니다.",
        };

        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    },
  );
};
