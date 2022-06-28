import { body } from "express-validator";

export default {
  signUpBody: [
    body("name").notEmpty().withMessage("이름 정보는 필수입니다.").bail().isString().trim(),
    body("email")
      .notEmpty()
      .withMessage("이메일 정보는 필수입니다.")
      .bail()
      .isEmail()
      .bail()
      .normalizeEmail(),
    body("password").notEmpty().withMessage("비밀번호는 필수입니다.").bail().isString(),
  ],
  signInBody: [
    body("email")
      .notEmpty()
      .withMessage("이메일 정보는 필수입니다.")
      .bail()
      .isEmail()
      .bail()
      .normalizeEmail(),
    body("password").notEmpty().withMessage("비밀번호는 필수입니다.").bail().isString(),
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
