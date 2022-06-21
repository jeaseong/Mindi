import { Request, Response, NextFunction } from 'express';
import logger from '../../loaders/winston';
import { StatusError } from '../../utils/error';

function errorHandler(error: StatusError, req: Request, res: Response, next: NextFunction) {
  logger.error(error.stack);

  const body = {
    success: false,
    error: {
      code: error.status,
      message: error.message,
    },
  };
  res.status(error.status!).send(body);
}

export default errorHandler;
