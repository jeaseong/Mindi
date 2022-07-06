import { NextFunction, Request, Response } from 'express';
import {ValidationError, validationResult} from 'express-validator';
import { StatusError } from '../../utils';

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const defaultMessage = "Invalid value";

  if (errors.isEmpty()) {
    return next();
  }

  if (errors.array()[0].hasOwnProperty("nestedErrors")) {
    errors.array()[0].nestedErrors!
      .map((error) => {
        if ((<ValidationError>error).msg !== defaultMessage) {
          throw new StatusError(400, (<ValidationError>error).msg);
        }
      });
  }
  else {
    errors
      .array()
      .map((error: ValidationError) => {
        if (error.msg !== defaultMessage) {
          throw new StatusError(400, error.msg);
        }
      });
  }
};
