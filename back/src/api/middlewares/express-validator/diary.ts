import { body, param, query, validationResult } from 'express-validator';

export default {
  diaryBody: [
    body('diary').notEmpty().withMessage('오늘의 일기를 작성해주세요.').bail().isString(),
    body('feeling').notEmpty().withMessage('오늘의 감정을 작성해주세요.').bail().isString(),
  ],
  dateQuery: [query('date').notEmpty().withMessage('요청 정보가 비어 있습니다.')],
  userIdEmpty: [body('userId').notEmpty().withMessage('올바른 요청이 아닙니다.').bail().isString()],
};
