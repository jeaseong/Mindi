import cors from "cors";
import morgan from "morgan";
import express from "express";

import { Request, Response, NextFunction } from "express";

const app: express.Application = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello, world!");
});

export { app };