import mongoose from "mongoose";
import config from "../../src/config";
import "reflect-metadata";
import express from "express";
import expressLoader from "../../src/loaders/express";
import dependencyLoader from "../../src/loaders/dependencies";
import axiosLoader from "../../src/loaders/axios";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createHttpTerminator, HttpTerminator } from "http-terminator";

// ai-server가 켜져 있어야 테스트가 가능합니다

let httpTerminator: HttpTerminator;
async function appStart() {
  const app: express.Application = express();
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  await axiosLoader();
  await dependencyLoader();
  await expressLoader({ app });
  const server = app.listen(config.port, () => {
    console.log(`
        Mindi API Server
        is running on: http://localhost:${config.port}`);
  });
  httpTerminator = createHttpTerminator({ server });
}

async function testEnd() {
  await mongoose.disconnect();
  // console.log(`${mongoose.connection.name} ${mongoose.connection.readyState} => 0: disconnected`);
  await httpTerminator.terminate();
  // console.log("Application is terminated.");
}

const apiURL = `http://localhost:${config.port}/api`;

export { appStart, testEnd, apiURL };
