import cors from "cors";
import morgan from "morgan";
import express from "express";
import routers from "../api";
import errorHandler from "../api/middlewares/errorHandler";
import config from "../config";

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(config.api.prefix, routers());

  app.use(errorHandler);
};
