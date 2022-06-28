import { body } from "express-validator";

export default {
  userUpdateBody: [
    body("name").exists({ checkNull: true }).isString().trim(),
    body("password").exists({ checkNull: true }).isString(),
    body("description").exists({ checkNull: true }).isString(),
  ],
  checkEmail: [
    body("email")
      .notEmpty()
      .withMessage("이메일 정보는 필수입니다.")
      .bail()
      .isEmail()
      .withMessage("이메일 형식이 올바르지 않습니다")
      .bail()
      .normalizeEmail(),
  ],
};
