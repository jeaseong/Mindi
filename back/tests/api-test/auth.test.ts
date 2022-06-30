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
      password: "test1234",
    });
    expect(response.status).toEqual(200);
    expect(response.body.result).toHaveProperty("_id", expect.any(String));
    expect(response.body.result).toHaveProperty("email", "test@test.com");
    expect(response.body.result).toHaveProperty("name", "test");
  });

  it("Sign-in test", async () => {
    const response = await request(server).post("/auth/local/sign-in").send({
      email: "test@test.com",
      password: "test1234",
    });
    expect(response.status).toEqual(200);
    expect(response.body.result).toHaveProperty("_id", expect.any(String));
    expect(response.body.result).toHaveProperty("email", "test@test.com");
    expect(response.body.result).toHaveProperty("name", "test");
    expect(response.body.result).toHaveProperty("token", expect.any(String));
    expect(response.body.result).toHaveProperty("expiresIn", "1d");
  });
});

afterAll(async () => {
  await testEnd();
});
