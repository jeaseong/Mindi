import { Router } from "express";
import auth from "./routers/auth";
import user from "./routers/user";

export default () => {
  const app = Router();

  user(app);
  auth(app);

  return app;
}