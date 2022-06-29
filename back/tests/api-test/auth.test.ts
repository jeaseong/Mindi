import { appStart, testEnd, server } from "./appStart";
import request from "supertest";

beforeAll(async () => {
  await appStart();
});

describe("Auth Router Test", () => {
  it("Sign-up test", async () => {
    const response = await request(server).post("/auth/local/sign-up").send({
      email: "test@test.com",
      name: "test",
      password: "1234",
    });
    expect(response.status).toEqual(200);
  });

  it("Sign-in test", async () => {
    const response = await request(server).post("/auth/local/sign-in").send({
      email: "test@test.com",
      password: "1234",
    });
    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  await testEnd();
});
