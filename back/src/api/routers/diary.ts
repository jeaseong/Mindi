import { Router, Request, Response, NextFunction } from "express";
import DiaryService from "../../services/diary";
import { BaseDiary, IDiary } from "../../interfaces/IDiary";
import validationErrorChecker from "../middlewares/validationErrorChecker";
import { diaryValidator } from "../middlewares/express-validator";
import { Container } from "typedi";
import { imageDelete, imageUpload } from "../middlewares/imageHandler";
import { loginRequired } from "../middlewares/loginRequired";
import { matchedData } from "express-validator";
import { IResponse } from "../../interfaces/IResponse";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export default (app: Router) => {
  const diaryRouter = Router();
  const diaryService = Container.get(DiaryService);

  app.use("/diaries", diaryRouter);

  diaryRouter.post(
    "/",
    imageUpload.single("background"), // 데이터 저장 실패 시, 이미지 저장 X
    loginRequired,
    diaryValidator.diaryBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;
        const imgInfo = Object(req.file);
        const { diary, feeling, sentiment } = matchedData(req);
        const createdDate = dayjs().locale("ko").format("YYYY-MM-DD"); // 일기 작성 날짜 생성
        let newDiary: BaseDiary = {
          userId,
          diary,
          feeling,
          sentiment: JSON.parse(sentiment),
          createdDate,
        };

        newDiary = imgInfo
          ? {
              ...newDiary,
              imageFileName: imgInfo.key,
              imageFilePath: imgInfo.location,
            }
          : newDiary;

        const createdDiary: IDiary = await diaryService.create(newDiary);

        const response: IResponse<Partial<IDiary>> = {
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
    imageUpload.single("background"),
    loginRequired,
    imageDelete,
    diaryValidator.diaryBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;
        const imgInfo = Object(req.file);
        const { _id, diary, feeling, sentiment, createdDate } = req.body;
        const id: string = _id;
        const toUpdate: BaseDiary = req.file
          ? {
              userId,
              diary,
              feeling,
              sentiment: JSON.parse(sentiment),
              createdDate,
              imageFileName: imgInfo.key,
              imageFilePath: imgInfo.location,
            }
          : { userId, diary, feeling, sentiment, createdDate };

        const updatedDiary = await diaryService.updateOne(id, toUpdate);

        const response: IResponse<Partial<IDiary>> = {
          success: true,
          result: updatedDiary,
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  diaryRouter.delete("/", imageDelete, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.body._id;
      await diaryService.deleteOne(id);

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
    loginRequired,
    diaryValidator.getDate,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.user!._id;
        const date: string = String(req.query.date);

        const diaries: IDiary[] = await diaryService.findByDate(userId, date);

        const response: IResponse<Partial<IDiary[]>> = {
          success: true,
          result: diaries,
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  diaryRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      const diary: IDiary = await diaryService.findById(id);

      const response: IResponse<Partial<IDiary>> = {
        success: true,
        result: diary,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });
};
