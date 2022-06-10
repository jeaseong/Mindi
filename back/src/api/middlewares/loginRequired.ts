import { NextFunction, Request, Response } from "express";
import passport from "../middlewares/passport";

function loginRequired(req: Request, res: Response, next: NextFunction) {
  const passportInstance = passport();
  return passportInstance.authenticate("jwtStrategy", { session: false })(req, res, next);
}

export { loginRequired };