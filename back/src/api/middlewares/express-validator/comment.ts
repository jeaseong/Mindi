import { body } from "express-validator";

export default {
  uploadBody: [
    body("content")
      .notEmpty()
      .withMessage("내용은 필수입니다.")
      .bail()
      .isString()
      .trim()
  ],
  modifyingBody: [
    body("content")
      .exists({ checkNull: true })
      .isString()
      .trim(),
  ]
};