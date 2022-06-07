import { Request, Response, NextFunction } from "express";

function errorHandler(error: { status: number, message: string }, req: Request, res: Response, next: NextFunction) {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", error);

  const body = {
    success: false,
    error: {
      code: error.status,
      message: error.message
    }
  };
  res
    .status(error.status)
    .send(body);
}

export default errorHandler;