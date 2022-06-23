import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusError } from '../../utils/error';

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  throw new StatusError(400, errors.array()[0].msg);
};
