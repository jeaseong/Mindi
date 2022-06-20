import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyLoader from './dependencies';
import redisLoader from "./redis";
import logger from "./winston";

export default async ({ expressApp }: { expressApp: any }) => {
  const redisClient: any = await redisLoader();
  logger.info("Redis: Connected");

  await mongooseLoader();
  logger.info("MongoDB: Connected");

  await dependencyLoader();
  logger.info("Dependencies: Loaded");

  await expressLoader({ app: expressApp, sessionClient: redisClient });
  logger.info("Express: Loaded");
};
