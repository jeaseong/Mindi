import { body, check } from "express-validator";
import dayjs from "dayjs";

export default {
  diaryBody: [
    body("diary")
      .isLength({ min: 50 })
      .withMessage("오늘의 일기를 50자 이상 작성해주세요.")
      .bail()
      .isString()
      .bail(),
    body("feeling")
      .isLength({ min: 50 })
      .withMessage("오늘의 감정을 50자 이상 작성해주세요.")
      .bail()
      .isString()
      .bail(),
    body("diaryDate").isISO8601().withMessage("존재하지 않는 날짜입니다."),
  ],
  getYear: [check("year").notEmpty().withMessage("연도 정보는 필수입니다.")],
};
