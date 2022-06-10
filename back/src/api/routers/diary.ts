import { Router, Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { StatusError } from '../../utils/error';
import DiaryService from '../../services/diary';
import { BaseDiary, Diary, MongoDiaryModel } from '../../interfaces/IDiary';

export default (app: Router) => {
  const diaryRouter = Router();
  const diaryModel = new MongoDiaryModel();
  const diaryService = new DiaryService(diaryModel);

  app.use('/diaries', diaryRouter);

  // TODO: 사진까지 첨부 가능하도록 하기: multer or AWS 사용
  diaryRouter.post(
    '/',
    body('diary').notEmpty().withMessage('일기 내용이 비어 있습니다.'),
    body('feeling').notEmpty().withMessage('감정 내용이 비어 있습니다.'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new StatusError(400, errors.array()[0].msg);
        }

        const Diary: BaseDiary = req.body;

        const newDiary: Diary = await diaryService.create(Diary);

        res.status(201).json(newDiary);
      } catch (error) {
        next(error);
      }
    },
  );

  diaryRouter.put(
    '/:id',
    body('diary').notEmpty().withMessage('일기 내용이 비어 있습니다.'),
    body('feeling').notEmpty().withMessage('감정 내용이 비어 있습니다.'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new StatusError(400, errors.array()[0].msg);
        }

        const id: string = req.params.id;
        const toUpdate: BaseDiary = req.body;

        const result = await diaryService.updateOne(id, toUpdate);

        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    },
  );

  diaryRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      await diaryService.deleteOne(id);

      // res.status(200).send(result);
      res.sendStatus(204); // No Content
    } catch (error) {
      next(error);
    }
  });

  diaryRouter.get(
    '/',
    query('date').notEmpty(),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new StatusError(400, '요청 정보가 비어 있습니다.');
        }

        const date: string = String(req.query.date); // 가정: "2022-6-10"

        const diary: Diary[] = await diaryService.findByDate(date);

        res.status(200).json(diary);
      } catch (error) {
        next(error);
      }
    },
  );
};
