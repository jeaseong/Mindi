import { body } from "express-validator";

export default {
  uploadBody: [
    body("title")
      .notEmpty()
      .withMessage("제목은 필수입니다.")
      .bail()
      .isString()
      .trim(),
    body("content")
      .notEmpty()
      .withMessage("내용은 필수입니다.")
      .bail()
      .isString()
  ],
  modifyingBody: [
    body("title")
      .exists({ checkNull: true })
      .isString()
      .trim(),
    body("content")
      .exists({ checkNull: true })
      .isString()
  ]
};