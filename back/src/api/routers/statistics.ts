import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { checkAuth, validationErrorChecker } from "../middlewares";
import { IStat, IResponse } from "../../interfaces";
import { statValidator } from "../middlewares/express-validator";
import { StatService, MLService } from "../../services";

export default (app: Router) => {
  const statRouter = Router();
  const statService = Container.get(StatService);
  const mlService = Container.get(MLService);

  app.use("/statistics", statRouter);

  statRouter.post(
    "/",
    checkAuth,
    statValidator.dayDiff, // 요청이 오늘 날짜를 기준으로 지난 달인지 검사
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;

        const { year, month } = req.query;
        const date: string = `${year}-${month}`;

        const { docList, myKeyword } = await mlService.postKeywordAnalysis(userId!, date); // 다이어리 모델의 다큐먼트 리스트와 키워드 분석 결과를 반환

        const newStat: Partial<IStat> = {
          userId,
          keywords: myKeyword,
        };

        const createdResult: IStat = await statService.create(newStat, date, docList);

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

  statRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
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

  statRouter.get("/", checkAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!._id;
      const { year, month } = req.query;
      const date: string = `${year}-${month}`;

      const result: IStat = await statService.findByDate(userId!, date);

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
