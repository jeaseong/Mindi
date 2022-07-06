import { NextFunction, Request, Response } from "express";
import { StatusError } from "../../utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import logger from "../../loaders/winston";

function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (token === undefined) {
    next(new StatusError(401, "Unauthorized"));
  }

  try {
    const payload = jwt.verify(token as string, config.jwtSecretKey as string) as JwtPayload;

    req.user = {
      colorScheme: [""],
      createdAt: "",
      email: "",
      name: "",
      password: "",
      recentLogin: "",
      role: "",
      updatedAt: "",
      _id: payload!._id };
    next();


  } catch(error) {
    if (error instanceof Error)
    logger.error(error?.message);
    next(new StatusError(401, "Unauthorized"));
  }
}

export { checkAuth };