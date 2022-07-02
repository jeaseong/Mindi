import {body, oneOf} from "express-validator";

export default {
  userUpdateBody: oneOf([
    body("name")
      .exists({ checkNull: true })
      .isString()
      .trim(),
    body("password")
      .exists({ checkNull: true })
      .isString()
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 0,
        minSymbols: 0
      })
      .withMessage("비밀번호를 확인해주세요.")
      .bail(),
  ]),
  checkPassword: [
    body("password")
      .exists({ checkNull: true })
      .withMessage("pass")
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 0,
        minSymbols: 0
      })
      .withMessage("비밀번호를 확인해주세요.")
      .bail(),
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
