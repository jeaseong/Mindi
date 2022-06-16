import { body, param, query, validationResult } from 'express-validator';

export default {
  diaryBody: [
    body('diary')
      .isLength({ min: 3 })
      .withMessage('오늘의 일기를 작성해주세요.')
      .bail()
      .isString()
      .bail(),
    body('feeling')
      .isLength({ min: 3 })
      .withMessage('오늘의 감정을 작성해주세요.')
      .bail()
      .isString(),
  ],
  getList: [
    query('date').notEmpty().withMessage('날짜 정보가 비어 있습니다.').bail(),
    query('userId').notEmpty().withMessage('유저 아이디 정보가 비어 있습니다.'),
  ],
};
