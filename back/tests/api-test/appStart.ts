import mongoose from "mongoose";
import config from "../../src/config";
// import "reflect-metadata";
import express from "express";
import expressLoader from "../../src/loaders/express";
import dependencyLoader from "../../src/loaders/dependencies";
import { MongoMemoryServer } from "mongodb-memory-server";

async function appStart() {
  const app: express.Application = express();
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  await dependencyLoader();
  await expressLoader({ app });
  app.listen(config.port, () => {
    console.log(`
    Mindi API Server
    is running on: http://localhost:${config.port}`);
  });
}

async function testEnd() {
  await mongoose.disconnect();
  console.log(`${mongoose.connection.name} ${mongoose.connection.readyState} => 0: disconnected`);
}

const server = `http://localhost:${config.port}/api`;

export { appStart, testEnd, server };
