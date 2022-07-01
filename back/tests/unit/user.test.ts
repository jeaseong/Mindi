import logger from "../../src/loaders/winston";
import UserService from "../../src/services/user";
import { TestUserModel, mockObjectId, userObject, fieldToUpdateUser, mockEmail } from "./mock/user";
import { testDiaryModel } from "./mock/diary";
import { testStatisticsModel } from "./mock/statistics";
import { testCommentModel } from "./mock/comment";
import { testPostModel } from "./mock/post";

describe("User Service Test", () => {
  const userService = new UserService(
    TestUserModel,
    testStatisticsModel,
    testDiaryModel,
    testCommentModel,
    testPostModel,
    logger,
  );

  test("should return UserInfo.", async () => {
    expect(await userService.getUserInfo(mockObjectId)).toEqual(userObject);
  });
  test("should update UserInfo", async () => {
    expect(await userService.updateUserInfo(mockObjectId, fieldToUpdateUser)).toEqual(userObject);
  });
  test("should update UserInfo", async () => {
    expect(await userService.resetPassword(mockEmail)).toHaveProperty("userInfo", userObject);
    expect(await userService.resetPassword(mockEmail)).toHaveProperty(
      "tempPassword",
      expect.any(String),
    );
  });
});
