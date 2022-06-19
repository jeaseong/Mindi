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

  console.log("NODE_ENV:", process.env.NODE_ENV);
  const server = app.listen(config.port, () => {
    logger.info(`
            Mindi API Server
            is running on: http://localhost:${config.port}
            `);
  });

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello, world!");
  });

  async function handle() {
    await mongoose.connection.close();
    logger.info("MongoDB: Discnnected");

    const httpTerminator = createHttpTerminator({ server });
    await httpTerminator.terminate();
    logger.info("Mindi API Server: Shutdown");
  }

  process.on("SIGINT", handle);
}

export = appStart();
