import { Router, Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { AuthService } from "../../services";
import { Container } from "typedi";
import { validationErrorChecker } from "../middlewares";
import { authValidator } from "../middlewares/express-validator";
import { IUser, IResponse } from "../../interfaces";
import { transporter } from "../../utils";

export default (app: Router) => {
  const authRouter = Router();

  app.use("/auth", authRouter);

  authRouter.post(
    "/local/sign-up",
    authValidator.signUpBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, name, password } = matchedData(req);

        const authService = Container.get(AuthService);
        const newUser = await authService.localSignUp(email, name, password);

        const response: IResponse<IUser> = {
          success: true,
          result: {
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
          },
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  authRouter.post(
    "/local/sign-in",
    authValidator.signInBody,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = matchedData(req);

        const authService = Container.get(AuthService);
        const user = await authService.localSignIn(email, password);

        const response: IResponse<object> = {
          success: true,
          result: {
            _id: user._id,
            email: user.email,
            name: user.name,
            token: user.token,
            expiresIn: user.expiresIn,
          },
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  authRouter.post(
    "/local/email",
    authValidator.checkEmail,
    validationErrorChecker,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const generateRandom = function (min: number, max: number) {
          const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
          return ranNum;
        };

        const authNum = generateRandom(111111, 999999);
        const { email } = matchedData(req);

        const mailOptions = {
          from: "Mindi",
          to: email,
          subject: "[Mindi] 회원가입을 위한 인증번호를 입력해주세요.",
          text: "오른쪽 숫자 6자리를 입력해주세요 : " + authNum,
        };

        await transporter.sendMail(mailOptions, (error, info) => {
          console.log("Finish sending email : " + info.response);
          res.status(200).send(authNum);
          transporter.close();
        });
      } catch (error) {
        next(error);
      }
    },
  );
};
