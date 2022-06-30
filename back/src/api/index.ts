import { Router } from "express";
import auth from "./routers/auth";
import user from "./routers/user";
import diary from "./routers/diary";
import post from "./routers/post";
import comment from "./routers/comment";
import statistics from "./routers/statistics";

export default () => {
  const app = Router();

  user(app);
  auth(app);
  diary(app);
  post(app);
  comment(app);
  statistics(app);

  return app;
};
