import { appStart, testEnd, apiURL } from "./appStart";
import request from "supertest";

let accessToken: string;
beforeAll(async () => {
  await appStart();
  await request(apiURL).post("/auth/local/sign-up").send({
    email: "test@test.com",
    name: "test",
    password: "test1234",
  });
  const mockUserInfo = await request(apiURL).post("/auth/local/sign-in").send({
    email: "test@test.com",
    password: "test1234",
  });
  accessToken = mockUserInfo.body.result.token;
});

describe("User Router Test", () => {
  it("Get test", async () => {
    const response = await request(apiURL)
      .get("/users")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
    expect(response.body.result).toMatchObject(
      expect.objectContaining({
        _id: expect.any(String),
        email: "test@test.com",
        name: "test",
        recentLogin: expect.any(String),
      }),
    );
  });

  it("Update test", async () => {
    const response = await request(apiURL)
      .put("/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "update test",
      });
    expect(response.status).toEqual(200);
    expect(response.body.result).toMatchObject(
      expect.objectContaining({
        _id: expect.any(String),
        email: "test@test.com",
        name: "update test",
        recentLogin: expect.any(String),
      }),
    );
  });

  it.skip("Withdrawal test", async () => {
    const response = await request(apiURL)
      .delete("/users")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  await testEnd();
});
