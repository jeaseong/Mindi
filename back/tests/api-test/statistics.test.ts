import request from "supertest";
import { faker } from "@faker-js/faker";
import "reflect-metadata";
import { appStart, testEnd, apiURL } from "./appStart";
import dayjs from "dayjs";

jest.setTimeout(10000);

faker.locale = "ko";
let accessToken: string;
let mockObjectId: string;
const date = dayjs("2022-05-01").toISOString();
const regexISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/ 

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

  const response = await request(apiURL)
    .post("/diaries")
    .set("Authorization", `Bearer ${accessToken}`)
    .type("multipart/form-data")
    .field("diary", faker.lorem.paragraph())
    .field("feeling", faker.lorem.paragraph())
    .field("diaryDate", date);
});

describe("Statistics Router Test", () => {
  it("Create a new result", async () => {
    const response = await request(apiURL)
      .post("/statistics?year=2022&month=05")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(201);
    expect(response.body.result).toMatchObject(
      expect.objectContaining({
        _id: expect.any(String),
        userId: expect.any(String),
        monthly: expect.stringMatching(regexISO),
        keywords: expect.any(Array<string>),
        emotions: expect.any(Object),
        reminder: expect.any(Array<object>),
      }),
    );
    mockObjectId = response.body.result._id;
  });

  it.skip("Update a result", async () => {
    const response = await request(apiURL)
      .post("/statistics?year=2022&month=05")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(201);
    expect(response.body.result).toMatchObject(
      expect.objectContaining({
        _id: expect.any(String),
        userId: expect.any(String),
        monthly: expect.stringMatching(regexISO),
        keywords: expect.any(Array<string>),
        emotions: expect.any(Object),
        reminder: expect.any(Array<object>),
      }),
    );
  });

  it("Get a result", async () => {
    const response = await request(apiURL)
      .get(`/statistics?year=2022&month=05`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
    expect(response.body.result).toMatchObject(
      expect.objectContaining({
        _id: expect.any(String),
        userId: expect.any(String),
        monthly: expect.stringMatching(regexISO),
        keywords: expect.any(Array<string>),
        emotions: expect.any(Object),
        reminder: expect.any(Array<object>),
      }),
    );
  });

  it("Delete a result", async () => {
    const response = await request(apiURL).delete(`/statistics/${mockObjectId}`).set("Authorization", `Bearer ${accessToken}`);;
    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  await testEnd();
});
