import "reflect-metadata";
import config from "./config";
import loader from "./loaders";
import express from "express";
import { Request, Response, NextFunction } from "express";
import logger from "./loaders/winston";
import mongoose from "mongoose";
import { createHttpTerminator } from "http-terminator";

async function appStart() {
  const app: express.Application = express();

  await loader({ expressApp: app });

  logger.info("NODE_ENV: ", config.nodeEnv);
  const server = app.listen(config.port, () => {
    logger.info(`
            Mindi API Server
            is running on: http://localhost:${config.port}
            `);
    if (config.nodeEnv === "production") {
      console.log(`
            Mindi API Server
            is running on: http://localhost:${config.port}
            `);
    }
  });

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello, world!");
  });

  async function handler(signal: string) {
    logger.info(`Received ${signal}`);

    await mongoose.connection.close();
    logger.info("MongoDB: Disconnected");

    const httpTerminator = createHttpTerminator({ server });
    await httpTerminator.terminate();
    logger.info("Application is terminated.");
  }

  process.on("SIGINT", () => {
    handler("SIGINT");
  });
  process.on("SIGTERM", () => {
    handler("SIGTERM");
  });

  process.on("uncaughtException", (error) => {
    // 무엇을 넣어야 하는 건지요...
    logger.error(error.message);
    process.exit(1);
  });
}

appStart();
