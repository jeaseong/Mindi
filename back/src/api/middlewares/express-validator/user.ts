import { body } from "express-validator";

export default {
  userUpdateBody: [
    body("name")
      .exists({ checkNull: true })
      .isString()
      .trim(),
    body("password")
      .exists({ checkNull: true })
      .isString(),
    body("description")
      .exists({ checkNull: true })
      .isString(),
  ],
};