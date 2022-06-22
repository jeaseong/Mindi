import { body, check } from "express-validator";

export default {
  resultBody: [
    body("monthly").isISO8601().withMessage("존재하지 않는 날짜입니다.").bail().isString().bail(),
    body("keywords")
      .notEmpty()
      .withMessage("키워드 통계가 포함되어 있지 않습니다.")
      .bail()
      .isObject()
      .bail(),
    body("emotions")
      .notEmpty()
      .withMessage("감정 통계가 포함되어 있지 않습니다.")
      .bail()
      .isObject()
      .bail(),
    check("diaries")
      .notEmpty()
      .withMessage("다이어리 리스트가 포함되어 있지 않습니다.")
      .bail()
      .isArray(),
  ],
};
