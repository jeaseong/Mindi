import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { loginRequired, validationErrorChecker } from "../middlewares";
import { IDiary, ISentiment, IStat, IResponse } from "../../interfaces";
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

        // 키워드 통계
        let diaryList: Array<string> = [];
        diaries.forEach((doc) => {
          diaryList.push(doc.diary);
        });
        const myKeyword = await postKeywordAnalysis({ diary: diaryList });

        // 감정 통계
        let myEmotion: ISentiment = {
          fear: 0,
          surprised: 0,
          anger: 0,
          sadness: 0,
          happiness: 0,
          aversion: 0,
        };
        diaries.forEach((doc) => {
          doc.sentiment.fear > 0 ? myEmotion.fear++ : myEmotion.fear;
          doc.sentiment.surprised > 0 ? myEmotion.surprised++ : myEmotion.surprised;
          doc.sentiment.anger > 0 ? myEmotion.anger++ : myEmotion.anger;
          doc.sentiment.sadness > 0 ? myEmotion.sadness++ : myEmotion.sadness;
          doc.sentiment.happiness > 0 ? myEmotion.happiness++ : myEmotion.happiness;
          doc.sentiment.aversion > 0 ? myEmotion.aversion++ : myEmotion.aversion;
        });

        // 가장 자주 관찰된 감정 추리기
        let mostEmotion = Object.entries(myEmotion).reduce((a, b) => (a[1] > b[1] ? a : b));

        // 높은 값이 여러 개일 때, 랜덤하게 하나 지정
        const found = Object.entries(myEmotion).filter((emotion) => emotion[1] === mostEmotion[1]);
        if (found.length > 1) {
          const randomIdx = Math.floor(Math.random() * found.length);
          mostEmotion = found[randomIdx];
        }
        const reminder: IDiary[] = await statService.findMostEmotionalDiary(userId, mostEmotion[0]);

        const newResult: Partial<IStat> = {
          userId,
          monthly: date,
          keywords: myKeyword,
          emotions: myEmotion,
          reminder,
        };
        const createdResult: IStat = await statService.create(userId, newResult);

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
