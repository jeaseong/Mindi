import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { loginRequired, validationErrorChecker } from "../middlewares";
import { IDiary, IStat, IResponse } from "../../interfaces";
import { statValidator } from "../middlewares/express-validator";
import { postKeywordAnalysis } from "../../utils";
import { StatService } from "../../services";

export default (app: Router) => {
  const statRouter = Router();
  const statService = Container.get(StatService);

  app.use("/statistics", statRouter);

  statRouter.post(
    "/",
    loginRequired,
    statValidator.dayDiff, // 요청이 오늘 날짜를 기준으로 지난 달인지 검사
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;

        const { year, month } = req.query;
        const date: string = `${year}-${month}`;

        const diaries: IDiary[] = await statService.findDiaryList(userId, date);

        let diaryList: Array<string> = [];
        diaries.forEach((doc) => {
          diaryList.push(doc.diary);
        });

        let sentimentList: Array<object> = [];
        diaries.forEach((doc) => {
          sentimentList.push(doc.sentiment);
        });

        const myKeyword = await postKeywordAnalysis({ diary: diaryList });
        // const myEmotion = await postEmotionAnalysis(sentimentList);

        // TODO: 임시, 서버랑 연결 후 삭제
        const myEmotion = sentimentList;

        const newResult: Partial<IStat> = {
          userId,
          monthly: date,
          keywords: myKeyword,
          emotions: myEmotion,
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
    statValidator.dayDiff,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;
        const id: string = req.body._id;
        const { year, month } = req.query;
        const date: string = `${year}-${month}`;

        const diaries: IDiary[] = await statService.findDiaryList(userId, date);

        let diaryList: Array<string> = [];
        diaries.forEach((doc) => {
          diaryList.push(doc.diary);
        });

        let sentimentList: Array<object> = [];
        diaries.forEach((doc) => {
          sentimentList.push(doc.sentiment);
        });

        const myKeyword = await postKeywordAnalysis(diaryList);
        // const myEmotion = await postEmotionAnalysis(sentimentList);
        const myEmotion = sentimentList;

        const toUpdate: Partial<IStat> = {
          monthly: date,
          keywords: myKeyword,
          emotions: myEmotion,
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
