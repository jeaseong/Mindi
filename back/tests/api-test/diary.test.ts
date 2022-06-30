import request from "supertest";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import "reflect-metadata";
import { appStart, server, testEnd } from "./appStart";

jest.setTimeout(10000);

faker.locale = "ko";
let accessToken: string;
let mockObjectId: string;
let imageFileName: string;
const today = dayjs().toISOString();
const regexISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/ 

beforeAll(async () => {
  await appStart();
  const result = await request(server).post("/auth/local/sign-up").send({
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

describe("Diary with no image", () => {
  it("Create a new diary without image", async () => {
    const response = await request(server)
      .post("/diaries")
      .set("Authorization", `Bearer ${accessToken}`)
      .type("multipart/form-data")
      .field("diary", faker.lorem.sentences())
      .field("feeling", faker.lorem.sentences())
      .field("diaryDate", today);
    expect(response.status).toEqual(201);
    expect(response.body.result).toHaveProperty("_id", expect.any(String));
    expect(response.body.result).toHaveProperty("userId", expect.any(String));
    expect(response.body.result).toHaveProperty("diary", expect.any(String));
    expect(response.body.result).toHaveProperty("feeling", expect.any(String));
    expect(response.body.result).toHaveProperty("sentiment", expect.any(Object));
    expect(response.body.result).toHaveProperty("videoId", expect.any(String));
    expect(response.body.result).toHaveProperty("diaryDate", expect.stringMatching(regexISO));
    mockObjectId = response.body.result._id;
  });

  it("Update a diary without image", async () => {
    const response = await request(server)
      .put("/diaries")
      .set("Authorization", `Bearer ${accessToken}`)
      .type("multipart/form-data")
      .field("_id", mockObjectId)
      .field("diary", faker.lorem.sentences())
      .field("feeling", faker.lorem.sentences())
      .field("diaryDate", today);
    expect(response.status).toEqual(200);
    expect(response.body.result).toHaveProperty("_id", expect.any(String));
    expect(response.body.result).toHaveProperty("userId", expect.any(String));
    expect(response.body.result).toHaveProperty("diary", expect.any(String));
    expect(response.body.result).toHaveProperty("feeling", expect.any(String));
    expect(response.body.result).toHaveProperty("sentiment", expect.any(Object));
    expect(response.body.result).toHaveProperty("videoId", expect.any(String));
    expect(response.body.result).toHaveProperty("diaryDate", expect.stringMatching(regexISO));
  });

  it("Get a diary list", async () => {
    const response = await request(server)
      .get(`/diaries?year=2022&month=06&day=00`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
    expect(response.body.result).toBeInstanceOf(Array<object>);
  });

  it("Delete a diary with no image", async () => {
    const response = await request(server).delete("/diaries").send({ _id: mockObjectId });
    expect(response.status).toEqual(200);
  });
});

describe("Diary with an image", () => {
  it("Create a new diary with an image", async () => {
    const response = await request(server)
      .post("/diaries")
      .set("Authorization", `Bearer ${accessToken}`)
      .type("multipart/form-data")
      .field("diary", faker.lorem.sentences())
      .field("feeling", faker.lorem.sentences())
      .field("diaryDate", today)
      .attach("background", "tests/test.jpg");
    expect(response.status).toEqual(201);
    expect(response.body.result).toHaveProperty("_id", expect.any(String));
    expect(response.body.result).toHaveProperty("userId", expect.any(String));
    expect(response.body.result).toHaveProperty("diary", expect.any(String));
    expect(response.body.result).toHaveProperty("feeling", expect.any(String));
    expect(response.body.result).toHaveProperty("sentiment", expect.any(Object));
    expect(response.body.result).toHaveProperty("videoId", expect.any(String));
    expect(response.body.result).toHaveProperty("diaryDate", expect.stringMatching(regexISO));
    expect(response.body.result).toHaveProperty("imageFileName", expect.any(String));
    expect(response.body.result).toHaveProperty("imageFilePath", expect.any(String));
    mockObjectId = response.body.result._id;
    imageFileName = response.body.result.imageFileName;
  });

  it("Update a diary with an image", async () => {
    const response = await request(server)
      .put("/diaries")
      .set("Authorization", `Bearer ${accessToken}`)
      .type("multipart/form-data")
      .field("_id", mockObjectId)
      .field("diary", faker.lorem.sentences())
      .field("feeling", faker.lorem.sentences())
      .field("imageFileName", imageFileName)
      .field("diaryDate", today)
      .attach("background", "tests/test2.jpg");
    expect(response.status).toEqual(200);
    expect(response.body.result).toHaveProperty("_id", expect.any(String));
    expect(response.body.result).toHaveProperty("userId", expect.any(String));
    expect(response.body.result).toHaveProperty("diary", expect.any(String));
    expect(response.body.result).toHaveProperty("feeling", expect.any(String));
    expect(response.body.result).toHaveProperty("sentiment", expect.any(Object));
    expect(response.body.result).toHaveProperty("videoId", expect.any(String));
    expect(response.body.result).toHaveProperty("diaryDate", expect.stringMatching(regexISO));
    expect(response.body.result).toHaveProperty("imageFileName", expect.any(String));
    expect(response.body.result).toHaveProperty("imageFilePath", expect.any(String));
    imageFileName = response.body.result.imageFileName;
  });

  it("Delete a diary with an image", async () => {
    const response = await request(server)
      .delete("/diaries")
      .send({ _id: mockObjectId, imageFileName: imageFileName });
    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  await testEnd();
});
