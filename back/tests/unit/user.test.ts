import { IUserModel } from '../../src/interfaces/IUserModel';
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import UserService from "../../src/services/user";
import logger from "../../src/loaders/winston";

const mockObjectId = faker.database.mongodbObjectId();
const dayString = dayjs().toISOString();
const mockEmail = faker.internet.email();
const mockName = faker.name.findName();
const role = "user";
const mockPassword = faker.internet.password();

const userObject = {
  _id: mockObjectId,
  name: mockName,
  email: mockEmail,
  password: mockPassword,
  role: role,
  colorScheme: ["#asdfgh"],
  recentLogin: dayString,
  createdAt: dayString,
  updatedAt: dayString
};

const fieldToUpdateUser = {
  name: mockName,
  password: mockPassword,
};

export class TestUserModel implements IUserModel {
  async create(email: string, name: string, password: string) {
    return userObject;
  }

  async update(filter: Object, fieldToUpdateUser: Object) {
    return userObject;
  }

  async delete(userId: string) {
    return;
  }

  async findOne(filter: Object) {
    return userObject;
  }

  async findMany(filter: Object) {
    return [
      userObject,
      userObject,
    ];
  }

  async exists(filter: Object) {
    return true;
  }
}

describe("User Service Test", () => {
  const userService = new UserService(new TestUserModel, logger);

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