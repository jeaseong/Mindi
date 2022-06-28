import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import dependencyLoader from "./dependencies";
import axiosLoader from "./axios";
import logger from "./winston";

export default async ({ expressApp }: { expressApp: any }) => {
  await mongooseLoader();
  logger.info("MongoDB: Connected");

  await axiosLoader();
  logger.info("Axios: Created");

  await dependencyLoader();
  logger.info("Dependencies: Loaded");

  await expressLoader({ app: expressApp });
  logger.info("Express: Loaded");
};
