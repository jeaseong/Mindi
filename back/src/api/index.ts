import { Router } from "express";
import auth from "./routers/auth";
import user from "./routers/user";
import diary from "./routers/diary";
import post from "./routers/post";

export default () => {
  const app = Router();

  user(app);
  auth(app);
  diary(app);
  post(app);

  return app;
};
