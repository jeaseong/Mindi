import { Router, Request, Response, NextFunction } from "express";
import { body, matchedData } from "express-validator";
import AuthService from "../../services/auth";
import { Container } from "typedi";
import validationErrorChecker from "../middlewares/validationErrorChecker";
import { authValidator } from "../middlewares/express-validator";

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

        const body = {
          success: true,
          user: {
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name
          },
        };

        res.status(201).json(body);
      } catch (error) {
        next(error);
      }
    });

  authRouter.post(
    "/local/sign-in",
    authValidator.signInBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = matchedData(req);

        const authService = Container.get(AuthService);
        const user = await authService.localSignIn(email, password);

        const body = {
          success: true,
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            token: user.token,
            expiresIn: user.expiresIn
          },
        };

        res.status(201).json(body);
      } catch (error) {
        next(error);
      }
    });

  authRouter.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = {
          success: true
        };

        res.send("get /auth");
      } catch (error) {
        next(error);
      }
    });
}