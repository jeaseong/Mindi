import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import DiaryService from '../../services/diary';
import { BaseDiary, Diary, MongoDiaryModel } from '../../interfaces/IDiary';

export default (app: Router) => {
  const diaryRouter = Router();
  const diaryModel = new MongoDiaryModel();
  const diaryService = new DiaryService(diaryModel);

  app.use('/diaries', diaryRouter);

  // TODO: express-validator 사용
  // TODO: 사진까지 첨부 가능하도록 하기: multer or AWS 사용
  diaryRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Diary: BaseDiary = req.body;

      const newDiary: Diary = await diaryService.create(Diary);

      res.status(201).json(newDiary);
    } catch (error) {
      next(error);
    }
  });

  diaryRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const toUpdate: BaseDiary = req.body;

      const result = await diaryService.updateOne(id, toUpdate);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  diaryRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      await diaryService.deleteOne(id);

      // res.status(200).send(result);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  diaryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const date: string = String(req.query.date); // 가정: "2022. 6. 10."

      const diary: Diary[] = await diaryService.findByDate(date);

      res.status(200).json(diary);
    } catch (error) {
      next(error);
    }
  });
};
