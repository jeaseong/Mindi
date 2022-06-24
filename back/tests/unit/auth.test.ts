import { IUserModel } from '../../src/interfaces/IUserModel';
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import AuthService from "../../src/services/auth";
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

export class TestUserModel implements IUserModel {
  async create(email: string, name: string, password: string) {
    return userObject;
  }

  async update(filter: Object, fieldToUpdate: Object) {
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

describe("Auth Service Test", () => {
  const authService = new AuthService(new TestUserModel, logger);

  test("should return UserInfo.", async () => {
    expect(await authService.localSignUp(mockEmail, mockName, mockPassword)).toEqual(userObject);
  });
  test("should return UserInfo and token with its expiration date", async () => {
    expect(await authService.localSignIn(mockEmail, mockPassword)).toMatchObject(userObject);
    expect(await authService.localSignIn(mockEmail, mockPassword)).toHaveProperty("token");
    expect(await authService.localSignIn(mockEmail, mockPassword)).toHaveProperty("expiresIn");
  });
});