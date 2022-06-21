import { body, check, oneOf, param, query, validationResult } from "express-validator";

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
      .isString(),
    body("sentiment").isLength({ min: 3 }).withMessage("감정 분석 결과가 포함되어 있지 않습니다."),
  ],
  getDate: [
    query("date").notEmpty().withMessage("날짜 정보가 비어 있습니다.").bail(),
    oneOf(
      [
        query("date").matches(/^\d\d\d\d$/),
        query("date").matches(/^\d\d\d\d-\d\d$/),
        query("date").matches(/^\d\d\d\d-\d\d-\d\d$/),
      ],
      "날짜 형식이 올바르지 않습니다.",
    ),
  ],
};
