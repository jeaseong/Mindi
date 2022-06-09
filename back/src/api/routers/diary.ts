import { Router, Request, Response, NextFunction } from 'express';
import DiaryService from '../../services/diary';
import { BaseDiary, Diary, MongoDiaryModel } from '../../interfaces/IDiary';

export default (app: Router) => {
  const diaryRouter = Router();
  const diaryService = new DiaryService(new MongoDiaryModel());

  app.use('/diaries', diaryRouter);

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

  // TODO: 쿼리로 날짜 받기 => 날짜로 다큐먼트 찾기??!
  diaryRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      const diary: Diary = await diaryService.findByDate(id);

      res.status(200).json(diary);
    } catch (error) {
      next(error);
    }
  });
};
