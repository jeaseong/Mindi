import { Router, Request, Response, NextFunction } from "express";

export default (app: Router) => {
  const userRouter = Router();

  app.use("/users", userRouter);

  userRouter.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = {
          success: true,
          user: { name: "name" },
        };

        res.status(201).json(body);
      } catch (error) {
        next(error);
      }
  });
}