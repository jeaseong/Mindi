import request from "supertest";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import config from "../../src/config";
import "reflect-metadata";
import express from "express";
import logger from "../../src/loaders/winston";
import expressLoader from "../../src/loaders/express";
import dependencyLoader from "../../src/loaders/dependencies";
import { MongoMemoryServer } from "mongodb-memory-server";

jest.setTimeout(7000);

faker.locale = "ko";
let accessToken: string;
let mockObjectId: string;
let mockDiaryObjectId: string;
const date = "2022-05-25";
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

  const response = await request(server)
    .post("/api/diaries")
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
      .post("/api/statistics?year=2022&month=05")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(201);
    mockObjectId = response.body.result._id;
  });

  it("Get a result", async () => {
    const response = await request(server)
      .get(`/api/statistics?year=2022&month=05`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
  });

  it("Delete a result", async () => {
    const response = await request(server).delete("/api/statistics").send({ _id: mockObjectId });
    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  await request(server).delete("/api/diaries").send({ _id: mockDiaryObjectId });

  await mongoose.disconnect();
  logger.info(`${mongoose.connection.name} ${mongoose.connection.readyState} => 0: disconnected`);
});
