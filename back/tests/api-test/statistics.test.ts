import request from "supertest";
import { faker } from "@faker-js/faker";
import "reflect-metadata";
import { appStart, server, testEnd } from "./appStart";
import dayjs from "dayjs";

jest.setTimeout(7000);

faker.locale = "ko";
let accessToken: string;
let mockObjectId: string;
let mockDiaryObjectId: string;
const date = dayjs("2022-05-01").toISOString();
const regexISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/ 

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

  const response = await request(server)
    .post("/diaries")
    .set("Authorization", `Bearer ${accessToken}`)
    .type("multipart/form-data")
    .field("diary", faker.lorem.paragraph())
    .field("feeling", faker.lorem.paragraph())
    .field("diaryDate", date);
  mockDiaryObjectId = response.body.result._id;
});

describe("Statistics Router Test", () => {
  it("Create a new result", async () => {
    const response = await request(server)
      .post("/statistics?year=2022&month=05")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(201);
    expect(response.body.result).toHaveProperty("_id", expect.any(String));
    expect(response.body.result).toHaveProperty("userId", expect.any(String));
    expect(response.body.result).toHaveProperty("monthly", expect.stringMatching(regexISO));
    expect(response.body.result).toHaveProperty("keywords", expect.any(Array<string>));
    expect(response.body.result).toHaveProperty("emotions", expect.any(Object));
    expect(response.body.result).toHaveProperty("reminder", expect.any(Array<object>));
    mockObjectId = response.body.result._id;
  });

  it("Get a result", async () => {
    const response = await request(server)
      .get(`/statistics?year=2022&month=05`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
    expect(response.body.result).toHaveProperty("_id", expect.any(String));
    expect(response.body.result).toHaveProperty("userId", expect.any(String));
    expect(response.body.result).toHaveProperty("monthly", expect.stringMatching(regexISO));
    expect(response.body.result).toHaveProperty("keywords", expect.any(Array<string>));
    expect(response.body.result).toHaveProperty("emotions", expect.any(Object));
    expect(response.body.result).toHaveProperty("reminder", expect.any(Array<object>));
  });

  it("Delete a result", async () => {
    const response = await request(server).delete(`/statistics/${mockObjectId}`);
    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  await request(server).delete("/diaries").send({ _id: mockDiaryObjectId });
  await testEnd();
});
