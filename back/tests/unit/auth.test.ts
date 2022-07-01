import AuthService from "../../src/services/auth";
import logger from "../../src/loaders/winston";
import { TestUserModel, mockEmail, mockName, mockPassword, userObject } from "./mock/user";

describe("Auth Service Test", () => {
  const authService = new AuthService(TestUserModel, logger);

  test("should return UserInfo.", async () => {
    expect(await authService.localSignUp(mockEmail, mockName, mockPassword)).toEqual(userObject);
  });
  test("should return UserInfo and token with its expiration date", async () => {
    expect(await authService.localSignIn(mockEmail, mockPassword)).toMatchObject(userObject);
    expect(await authService.localSignIn(mockEmail, mockPassword)).toHaveProperty("token");
    expect(await authService.localSignIn(mockEmail, mockPassword)).toHaveProperty("expiresIn");
  });
});