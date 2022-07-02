import { appStart, testEnd, apiURL } from "./appStart";
import request from "supertest";

let accessToken: string;
beforeAll(async () => {
  await appStart();
});

describe("Auth Router Test", () => {
  it("Sign-up test", async () => {
    const response = await request(apiURL).post("/auth/local/sign-up").send({
      email: "test@test.com",
      name: "test",
      password: "test1234",
    });
    expect(response.status).toEqual(200);
    expect(response.body.result).toMatchObject(
      expect.objectContaining({
        _id: expect.any(String),
        email: "test@test.com",
        name: "test",
      }),
    );
  });

  it("Sign-in test", async () => {
    const response = await request(apiURL).post("/auth/local/sign-in").send({
      email: "test@test.com",
      password: "test1234",
    });
    expect(response.status).toEqual(200);
    expect(response.body.result).toMatchObject(
      expect.objectContaining({
        _id: expect.any(String),
        email: "test@test.com",
        name: "test",
        token: expect.any(String),
        expiresIn: "1d",
      }),
    );
    accessToken = response.body.result.token;
  });
});

afterAll(async () => {
  await testEnd();
});
