// import { NextFunction, Request, Response } from "express";
// import {StatusError} from "../../utils/error";
//
// export default (req: Request, res: Response, next: NextFunction) => {
//   const userToken: string | null = req.headers["authorization"]?.split(" ")[1] ?? null;
//
//   if (!userToken)
//     throw new StatusError(403, "로그인한 유저만 사용할 수 있는 서비스입니다.");
//
//   try {
//     const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
//     const jwtDecoded = jwt.verify(userToken, secretKey);
//     const userId = jwtDecoded.userId;
//     req.currentUserId = userId;
//     next();
//   } catch (err) {
//     const error = new Error("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
//     error.status = 403;
//     throw error;
//   }
// };