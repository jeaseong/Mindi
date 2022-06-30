import { appStart, testEnd, server } from "./appStart";
import request from "supertest";

let accessToken: string;
beforeAll(async () => {
  await appStart();
  await request(server).post("/auth/local/sign-up").send({
    email: "test@test.com",
    name: "test",
    password: "test1234",
  });
  const mockUserInfo = await request(server).post("/auth/local/sign-in").send({
    email: "test@test.com",
    password: "test1234",
  });
  accessToken = mockUserInfo.body.result.token;
});

describe("User Router Test", () => {
  it("Get test", async () => {
    const response = await request(server)
      .get("/users")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
    expect(response.body.result).toHaveProperty("_id", expect.any(String));
    expect(response.body.result).toHaveProperty("email", "test@test.com");
    expect(response.body.result).toHaveProperty("name", "test");
    expect(response.body.result).toHaveProperty("recentLogin", expect.any(String));
  });

  it("Update test", async () => {
    const response = await request(server)
      .put("/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "update test",
      });
    expect(response.status).toEqual(200);
    expect(response.body.result).toHaveProperty("_id", expect.any(String));
    expect(response.body.result).toHaveProperty("email", "test@test.com");
    expect(response.body.result).toHaveProperty("name", "update test");
    expect(response.body.result).toHaveProperty("recentLogin", expect.any(String));
  });

  it("Withdrawal test", async () => {
    const response = await request(server)
      .delete("/users")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
  });

  it("Password-reset test", async () => {
    const response = await request(server)
      .delete("/users/password-reset")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  await testEnd();
});
