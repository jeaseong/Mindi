// "jest --detectOpenHandles --forceExit"
import request from "supertest";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import config from "../../src/config";
import "reflect-metadata";
import express from "express";
import logger from "../../src/loaders/winston";
import expressLoader from "../../src/loaders/express";
import dependencyLoader from "../../src/loaders/dependencies";
import { MongoMemoryServer } from "mongodb-memory-server";

let accessToken: string;
let mockObjectId: string;
let imageFileName: string;
const sentiment = {
  fear: 2,
  surprised: 0,
  anger: 0,
  sadness: 2,
  happiness: 1,
  aversion: 0,
};
const today = dayjs().locale("ko").format("YYYY-MM-DD");
const server = `http://localhost:${config.port}`;

async function appStart() {
  const app: express.Application = express();
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  await dependencyLoader();
  await expressLoader({ app });
  app.listen(config.port, () => {
    logger.info(`
            Mindi API Server
            is running on: http://localhost:${config.port}
            `);
  });
}

beforeAll(async () => {
  await appStart();
  await request(server).post("/api/auth/local/sign-up").send({
    email: "test@test.com",
    name: "test",
    password: "1234",
  });
  const mockUserInfo = await request(server).post("/api/auth/local/sign-in").send({
    email: "test@test.com",
    password: "1234",
  });
  accessToken = mockUserInfo.body.result.token;
});

describe("Diary with no image", () => {
  it("Create a new diary without image", async () => {
    const response = await request(server)
      .post("/api/diaries")
      .set("Authorization", `Bearer ${accessToken}`)
      .type("multipart/form-data")
      .field("diary", faker.lorem.sentence())
      .field("feeling", faker.lorem.sentence())
      .field("sentiment", JSON.stringify(sentiment));
    expect(response.status).toEqual(201);
    mockObjectId = response.body.result._id;
  });

  it("Update a diary without image", async () => {
    const response = await request(server)
      .put("/api/diaries")
      .set("Authorization", `Bearer ${accessToken}`)
      .type("multipart/form-data")
      .field("_id", mockObjectId)
      .field("diary", faker.lorem.sentence())
      .field("feeling", faker.lorem.sentence())
      .field("sentiment", JSON.stringify(sentiment))
      .field("createdDate", today);
    expect(response.status).toEqual(200);
  });

  it("Get a diary list", async () => {
    const response = await request(server)
      .get(`/api/diaries?date=${"2022-06"}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
  });

  it("Get a diary", async () => {
    const response = await request(server).get(`/api/diaries/${mockObjectId}`);
    expect(response.status).toEqual(200);
  });

  it("Delete a diary with no image", async () => {
    const response = await request(server).delete("/api/diaries").send({ _id: mockObjectId });
    expect(response.status).toEqual(200);
  });
});

describe("Diary with an image", () => {
  it("Create a new diary with an image", async () => {
    const response = await request(server)
      .post("/api/diaries")
      .set("Authorization", `Bearer ${accessToken}`)
      .type("multipart/form-data")
      .field("diary", faker.lorem.sentence())
      .field("feeling", faker.lorem.sentence())
      .field("sentiment", JSON.stringify(sentiment))
      .attach("background", "tests/test.jpg");
    expect(response.status).toEqual(201);
    mockObjectId = response.body.result._id;
    imageFileName = response.body.result.imageFileName;
  });

  it("Update a diary with an image", async () => {
    const response = await request(server)
      .put("/api/diaries")
      .set("Authorization", `Bearer ${accessToken}`)
      .type("multipart/form-data")
      .field("_id", mockObjectId)
      .field("diary", faker.lorem.sentence())
      .field("feeling", faker.lorem.sentence())
      .field("sentiment", JSON.stringify(sentiment))
      .field("imageFileName", imageFileName)
      .field("createdDate", today)
      .attach("background", "tests/test2.jpg");
    expect(response.status).toEqual(200);
  });

  it("Delete a diary with an image", async () => {
    const response = await request(server)
      .delete("/api/diaries")
      .send({ _id: mockObjectId, imageFileName: imageFileName });
    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  logger.info(`${mongoose.connection.name} ${mongoose.connection.readyState} => 0: disconnected`);
});
