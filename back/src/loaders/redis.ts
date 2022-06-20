import * as redis from "redis";
import logger from "./winston";
import config from "../config";

export default async () => {
  const client = redis.createClient({
    socket: {
      port: config.redisPort as number,
      host: config.redisHost
    },
    legacyMode: true
  });

  client.on("error", (error) => {
    logger.error(error);
  });

  await client.connect();

  return client;
};