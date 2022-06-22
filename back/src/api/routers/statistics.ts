import { Router, Request, Response, NextFunction } from "express";
import StatService from "../../services/statistics";
import validationErrorChecker from "../middlewares/validationErrorChecker";
import { Container } from "typedi";
import { loginRequired } from "../middlewares/loginRequired";
import { matchedData } from "express-validator";
import { IResponse } from "../../interfaces/IResponse";
import { BaseStat, IStat } from "../../interfaces/IStatistics";
import { statValidator } from "../middlewares/express-validator";

export default (app: Router) => {
  const statRouter = Router();
  const statService = Container.get(StatService);

  app.use("/statistics", statRouter);

  statRouter.post(
    "/",
    loginRequired,
    statValidator.resultBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;
        const { monthly, keywords, emotions, diaries } = matchedData(req);
        const newResult: BaseStat = {
          userId,
          monthly,
          keywords,
          emotions,
          diaries,
        };

        const createdResult: IStat = await statService.create(newResult);

        const response: IResponse<IStat> = {
          success: true,
          result: createdResult,
        };

        res.status(201).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  statRouter.put(
    "/",
    loginRequired,
    statValidator.resultBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;
        const { _id, monthly, keywords, emotions, diaries } = req.body;

        const id: string = _id;
        const toUpdate: BaseStat = {
          userId,
          monthly,
          keywords,
          emotions,
          diaries,
        };

        const updatedDiary = await statService.updateOne(id, toUpdate);

        const response: IResponse<IStat> = {
          success: true,
          result: updatedDiary,
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  statRouter.delete("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.body._id;
      await statService.deleteOne(id);

      const response: IResponse<string> = {
        success: true,
        result: "성공적으로 삭제되었습니다.",
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  statRouter.get("/", loginRequired, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!._id;
      const { year, month } = req.query;
      const monthly: string = `${year}-${month}`;

      const result: IStat = await statService.findByDate(userId, monthly);

      const response: IResponse<IStat> = {
        success: true,
        result,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });
};
