import { body, check } from "express-validator";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export default {
  diaryBody: [
    body("diary")
      .isLength({ min: 3 }) //TODO: 몇 자 이상 작성하라고 하지?
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
    body("diaryDate")
      .isISO8601()
      .withMessage("존재하지 않는 날짜입니다.")
      .bail()
      .custom((value) => {
        // const diaryDate = dayjs(value);
        const today = dayjs().locale("ko");
        const checkDate = today.diff(value, "day");
        return checkDate >= 0;
      })
      .withMessage("오늘 또는 과거 날짜의 일기만 작성할 수 있습니다."),
  ],
  getYear: [check("year").notEmpty().withMessage("연도 정보는 필수입니다.")],
};
