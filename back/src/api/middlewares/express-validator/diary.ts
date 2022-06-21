import { body, check } from "express-validator";

export default {
  diaryBody: [
    body("diary")
      .isLength({ min: 3 })
      .withMessage("오늘의 일기를 작성해주세요.")
      .bail()
      .isString()
      .bail(),
    body("feeling")
      .isLength({ min: 3 })
      .withMessage("오늘의 감정을 작성해주세요.")
      .bail()
      .isString()
      .bail(),
    body("sentiment")
      .isLength({ min: 3 })
      .withMessage("감정 분석 결과가 포함되어 있지 않습니다.")
      .bail(),
    check("diaryDate")
      .isISO8601()
      .withMessage("존재하지 않는 날짜입니다.")
      .bail()
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage("날짜 형식이 올바르지 않습니다."),
  ],
  getYear: [check("year").notEmpty().withMessage("연도 정보는 필수입니다.")],
};
