import { body, check } from "express-validator";
import dayjs from "dayjs";

export default {
  dayDiff: [
    check("year").notEmpty().withMessage("연도 정보는 필수입니다.").bail(),
    check("month")
      .notEmpty()
      .custom((value, { req }) => {
        const Q = Object(req.query);
        const queryDate = dayjs(`${Q.year}-${Q.month}`);
        const today = dayjs();
        const checkDate = today.diff(queryDate, "month");
        return checkDate > 0;
      })
      .withMessage("한 달이 지난 결과만 확인할 수 있습니다."),
  ],
};
