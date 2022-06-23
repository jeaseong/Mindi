import { NextFunction, Request, Response } from "express";
import {StatusError} from "../../utils/error";
// import passport from "../middlewares/passport";
//
// function loginRequired(req: Request, res: Response, next: NextFunction) {
//   const passportInstance = passport();
//   return passportInstance.authenticate("jwtStrategy", { session: false })(req, res, next);
// }
//
function loginRequired(req: Request, res: Response, next: NextFunction) {
  if (req.session.authorized) {
    next();
  }
  else {
    const error = new StatusError(400, "로그인이 필요합니다.");
    next(error);
  }
}

export { loginRequired };