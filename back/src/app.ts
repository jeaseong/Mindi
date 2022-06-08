import 'reflect-metadata';
import config from "./config";
import loader from "./loaders";
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import path from 'path';
import express from "express";
import { Request, Response, NextFunction } from "express";

async function appStart() {
  const app: express.Application = express();

  const swaggerSpec: any = yaml.load(path.join(__dirname, './modules/swagger.yaml'));

  await loader({ expressApp: app });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

  app.listen(config.port, () => {
    console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${config.port}`);
  });

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello, world!");
  });
}

appStart();