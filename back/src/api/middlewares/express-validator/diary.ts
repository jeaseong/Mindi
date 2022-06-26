import { body, check } from "express-validator";
import dayjs from "dayjs";
import "dayjs/locale/ko";

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
    check("diaryDate")
      .isISO8601()
      .withMessage("존재하지 않는 날짜입니다.")
      .bail()
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage("날짜 형식이 올바르지 않습니다.")
      .bail()
      .custom((value) => {
        const diaryDate = dayjs(value).locale("ko");
        const today = dayjs().locale("ko");
        const checkDate = today.diff(diaryDate, "day");
        return checkDate > 0;
      })
      .withMessage("과거 날짜의 일기만 작성할 수 있습니다."),
  ],
  getYear: [check("year").notEmpty().withMessage("연도 정보는 필수입니다.")],
};
