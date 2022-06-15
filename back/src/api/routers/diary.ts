import { Router, Request, Response, NextFunction } from 'express';
import DiaryService from '../../services/diary';
import { BaseDiary, IDiary } from '../../interfaces/IDiary';
import validationErrorChecker from '../middlewares/validationErrorChecker';
import { diaryValidator } from '../middlewares/express-validator';
import { Container } from 'typedi';
import { imageDelete, imageUpload } from '../middlewares/imageHandler';

export default (app: Router) => {
  const diaryRouter = Router();
  const diaryService = Container.get(DiaryService);

  app.use('/diaries', diaryRouter);

  diaryRouter.post(
    '/',
    imageUpload.single('background'), // field name
    diaryValidator.diaryBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const imgInfo = Object(req.file);
        let Diary: BaseDiary = req.body;
        Diary = imgInfo
          ? {
              ...Diary,
              imageFileName: imgInfo.key,
              imageFilePath: imgInfo.location,
            }
          : Diary;

        const newDiary: IDiary = await diaryService.create(Diary);

        const body = {
          success: true,
          diary: newDiary,
        };

        res.status(201).json(body);
      } catch (error) {
        next(error);
      }
    },
  );

  diaryRouter.put(
    '/',
    imageUpload.single('background'),
    imageDelete,
    diaryValidator.diaryBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const imgInfo = Object(req.file);
        const { _id, userId, diary, feeling, createdDate } = req.body;
        const id: string = _id;
        const toUpdate: BaseDiary = req.file
          ? {
              userId,
              diary,
              feeling,
              createdDate,
              imageFileName: imgInfo.key,
              imageFilePath: imgInfo.location,
            }
          : { userId, diary, feeling, createdDate };

        const updatedDiary = await diaryService.updateOne(id, toUpdate);

        const body = {
          success: true,
          diary: updatedDiary,
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    },
  );

  diaryRouter.delete('/', imageDelete, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.body._id;
      await diaryService.deleteOne(id);

      res.sendStatus(204); // No Content
    } catch (error) {
      next(error);
    }
  });

  diaryRouter.get(
    '/',
    diaryValidator.dateQuery,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const date: string = String(req.query.date); // 가정: "2022-6-10"

        const diaries: IDiary[] = await diaryService.findByDate(date);

        const body = {
          success: true,
          diaries: diaries,
        };

        res.status(200).json(body);
      } catch (error) {
        next(error);
      }
    },
  );

  diaryRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      const diary: IDiary = await diaryService.findById(id);

      const body = {
        success: true,
        diaries: diary,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });
};
