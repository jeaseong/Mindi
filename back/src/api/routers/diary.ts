import { Router, Request, Response, NextFunction } from "express";
import { IDiary, IResponse } from "../../interfaces";
import { diaryValidator } from "../middlewares/express-validator";
import { validationErrorChecker, imageUpload, checkAuth } from "../middlewares";
import { matchedData, validationResult } from "express-validator";
import { StatusError, imageDelete } from "../../utils";
import { Container } from "typedi";
import { DiaryService, MLService } from "../../services";
import { UnitType } from "dayjs";

export default (app: Router) => {
  const diaryRouter = Router();
  const diaryService = Container.get(DiaryService);
  const mlService = Container.get(MLService);

  app.use("/diaries", diaryRouter);

  diaryRouter.post(
    "/",
    checkAuth,
    imageUpload.single("background"),
    diaryValidator.diaryBody,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;
        const imgInfo = <{ key: string; location: string }>(<object>req.file);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          if (imgInfo) {
            await imageDelete(imgInfo.key);
          }
          throw new StatusError(400, errors.array()[0].msg);
        }

        const { diary, feeling, diaryDate } = matchedData(req);

        const { sentiment_dict, videoId } = imgInfo
          ? await mlService.postSentimentAnalysis(feeling, userId, diaryDate, imgInfo.key)
          : await mlService.postSentimentAnalysis(feeling, userId, diaryDate);

        let newDiary: Partial<IDiary> = {
          userId,
          diary,
          feeling,
          sentiment: sentiment_dict,
          videoId,
          diaryDate,
        };

        newDiary = imgInfo
          ? {
              ...newDiary,
              imageFileName: imgInfo.key,
              imageFilePath: imgInfo.location,
            }
          : newDiary;

        const createdDiary: IDiary = await diaryService.create(userId, newDiary);

        const response: IResponse<IDiary> = {
          success: true,
          result: createdDiary,
        };

        res.status(201).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  diaryRouter.put(
    "/",
    checkAuth,
    imageUpload.single("background"),
    diaryValidator.diaryBody,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const imgInfo = <{ key: string; location: string }>(<object>req.file);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          if (imgInfo) {
            await imageDelete(imgInfo.key);
          }
          throw new StatusError(400, errors.array()[0].msg);
        }

        const { _id, diary, feeling, diaryDate, imageFileName } = req.body;
        const id: string = _id;
        const { sentiment_dict, videoId } = imgInfo
          ? await mlService.postSentimentAnalysis(feeling, imgInfo.key)
          : await mlService.postSentimentAnalysis(feeling);

        let toUpdate: Partial<IDiary> = {
          diary,
          feeling,
          sentiment: sentiment_dict,
          videoId,
          imageFileName,
          diaryDate,
        };

        toUpdate = imgInfo
          ? {
              ...toUpdate,
              imageFileName: imgInfo.key,
              imageFilePath: imgInfo.location,
            }
          : toUpdate;

        const updatedDiary = await diaryService.updateOne(id, toUpdate, imageFileName);

        const response: IResponse<IDiary> = {
          success: true,
          result: updatedDiary,
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  diaryRouter.delete("/", checkAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.body._id;
      const imageFileName = req.body.imageFileName;
      await diaryService.deleteOne(id, imageFileName);

      const response: IResponse<string> = {
        success: true,
        result: "성공적으로 삭제되었습니다.",
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  diaryRouter.get(
    "/",
    checkAuth,
    diaryValidator.getYear,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;
        const { year, month, day } = req.query;

        let date: string;
        let set: UnitType;
        if (!day && !month) {
          date = `${year}`;
          set = "year";
        } else if (!month) {
          throw new StatusError(400, "올바르지 않은 요청입니다.");
        } else if (!day) {
          date = `${year}-${month}`;
          set = "month";
        } else {
          date = `${year}-${month}-${day}`;
          set = "day";
        }

        const diaries: IDiary[] = await diaryService.findByDate(userId!, date, set);

        const response: IResponse<IDiary[]> = {
          success: true,
          result: diaries,
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );
};
