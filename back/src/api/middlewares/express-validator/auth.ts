import { body } from "express-validator";

export default {
  signUpBody: [
    body("name")
      .notEmpty()
      .withMessage("이름 정보는 필수입니다.")
      .bail()
      .isString()
      .trim()
      .isLength({ min: 2 })
      .withMessage("이름은 2글자 이상이어야 합니다.")
      .bail(),
    body("email")
      .notEmpty()
      .withMessage("이메일 정보는 필수입니다.")
      .bail()
      .isEmail()
      .bail()
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("비밀번호는 필수입니다.")
      .bail()
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 0,
        minSymbols: 0
      })
      .withMessage("비밀번호를 확인해주세요.")
      .bail()
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
