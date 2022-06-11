import { Router, Request, Response, NextFunction } from 'express';
import DiaryService from '../../services/diary';
import { BaseDiary, IDiary } from '../../interfaces/IDiary';
import { imageUpload, imageDelete } from '../middlewares/imageHandler';
import validationErrorChecker from '../middlewares/validationErrorChecker';
import { diaryValidator } from '../middlewares/express-validator';
import { MongoDiaryModel } from '../../models/diary';

export default (app: Router) => {
  const diaryRouter = Router();
  const diaryModel = new MongoDiaryModel();
  const diaryService = new DiaryService(diaryModel);

  app.use('/diaries', diaryRouter);

  diaryRouter.post(
    '/',
    imageUpload.single('background'), // field name
    diaryValidator.diaryBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const imageFileName = req.file?.filename; // 저장된 파일명​
        const imageFilePath = `http://localhost:5001/images/${imageFileName}`;

        let Diary: BaseDiary = req.body;

        Diary = {
          ...Diary,
          imageFileName,
          imageFilePath,
        };

        const newDiary: IDiary = await diaryService.create(Diary);

        res.status(201).json(newDiary);
      } catch (error) {
        next(error);
      }
    },
  );

  diaryRouter.put(
    '/',
    diaryValidator.diaryBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { _id, userId, diary, feeling, createdDate } = req.body;
        const id: string = _id;
        const toUpdate: BaseDiary = {
          userId,
          diary,
          feeling,
          createdDate,
        };

        const updatedDiary = await diaryService.updateOne(id, toUpdate);

        res.status(200).json(updatedDiary);
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

        res.status(200).json(diaries);
      } catch (error) {
        next(error);
      }
    },
  );
};
