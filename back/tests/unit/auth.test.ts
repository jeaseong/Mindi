import AuthService from "../../src/services/auth";
import logger from "../../src/loaders/winston";
import {
  SignUpTestModel,
  SignInTestModel,
  mockEmail,
  mockName,
  mockPassword,
  userObject,
} from "./mock/auth";

describe("Auth Service Test", () => {
  test("should return UserInfo.", async () => {
    const authService = new AuthService(SignUpTestModel, logger);
    expect(await authService.localSignUp(mockEmail, mockName, mockPassword)).toEqual(userObject);
  });
  test("should return UserInfo and token with its expiration date", async () => {
    let authService = new AuthService(SignUpTestModel, logger);
    await authService.localSignUp(mockEmail, mockName, mockPassword);
    authService = new AuthService(SignInTestModel, logger);
    expect(await authService.localSignIn(mockEmail, mockPassword)).toMatchObject(userObject);
    expect(await authService.localSignIn(mockEmail, mockPassword)).toHaveProperty("token");
    expect(await authService.localSignIn(mockEmail, mockPassword)).toHaveProperty("expiresIn");
  });
});
