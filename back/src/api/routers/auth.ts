import { Router, Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { AuthService } from "../../services";
import { Container } from "typedi";
import { validationErrorChecker } from "../middlewares";
import { authValidator } from "../middlewares/express-validator";
import { IUser, IResponse } from "../../interfaces";

export default (app: Router) => {
  const authRouter = Router();

  app.use("/auth", authRouter);

  authRouter.post(
    "/local/sign-up",
    authValidator.signUpBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, name, password } = matchedData(req);

        const authService = Container.get(AuthService);
        const newUser = await authService.localSignUp(email, name, password);

        const response: IResponse<IUser> = {
          success: true,
          result: {
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
          },
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  authRouter.post(
    "/local/sign-in",
    authValidator.signInBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = matchedData(req);

        const authService = Container.get(AuthService);
        const user = await authService.localSignIn(email, password);

        const response: IResponse<object> = {
          success: true,
          result: {
            _id: user._id,
            email: user.email,
            name: user.name,
            token: user.token,
            expiresIn: user.expiresIn,
          },
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  authRouter.post(
    "/local/sign-up/mail",
    authValidator.checkEmail,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email } = matchedData(req);

        const authService = Container.get(AuthService);
        const code = await authService.sendMail(email);

        const response: IResponse<string> = {
          success: true,
          result: code,
        };

        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    },
  );
};
