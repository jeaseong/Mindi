import { Router, Request, Response, NextFunction } from "express";
import AuthService from "../../services/auth";
import { Container } from "typedi";

export default (app: Router) => {
  const authRouter = Router();

  app.use("/auth", authRouter);

  authRouter.post(
    "/local/sign-up",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, name, password } = req.body;

        const authService = Container.get(AuthService);
        const newUser = await authService.localSignUp(email, name, password);

        const body = {
          success: true,
          user: newUser,
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