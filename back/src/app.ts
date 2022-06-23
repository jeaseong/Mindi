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

  logger.info("NODE_ENV:", process.env.NODE_ENV);
  const server = app.listen(config.port, () => {
    logger.info(`
            Mindi API Server
            is running on: http://localhost:${config.port}
            `);
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
    logger.info("Mindi API Server: Shutdown");

    logger.info("Application is terminated.");
  }

  process.on("SIGINT", () => {
    handler("SIGINT");
  });
  process.on("SIGTERM", () => {
    handler("SIGTERM");
  });

}

appStart();
