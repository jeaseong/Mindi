import UserService from "../../src/services/user";
import { TestUserModel, userObject, mockObjectId, fieldToUpdateUser } from "./mock/user";
import logger from "../../src/loaders/winston";
import {testDiaryModel} from "./mock/diary";
import {testStatisticsModel} from "./mock/statistics";

describe("User Service Test", () => {
  const userService = new UserService(
    TestUserModel,
    testStatisticsModel,
    testDiaryModel,
    TestPostModel,
    TestCommentModel,
    logger);

  test("should return UserInfo.", async () => {
    expect(await userService.getUserInfo(mockObjectId)).toEqual(userObject);
  });
  test("should update UserInfo", async () => {
    expect(await userService.updateUserInfo(mockObjectId, fieldToUpdateUser)).toEqual(userObject);
  });
  test("should delete User", async () => {
    expect(await userService.deleteUser(mockObjectId)).toBe(undefined);
  });
});