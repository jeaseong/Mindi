import cors from "cors";
import morgan from "morgan";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs'
import path from "path";
import connectDB from "./loaders/mongoose";

import { Request, Response, NextFunction } from "express";

const app: express.Application = express();
const swaggerSpec = YAML.load(path.join(__dirname, './modules/swagger.yaml'))
connectDB()

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup((swaggerSpec), {explorer: true }))

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello, world!");
});

export { app };