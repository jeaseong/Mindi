import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import routers from '../api';
import errorHandler from '../api/middlewares/errorHandler';
import config from '../config';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import session from "express-session";
import connectRedis from "connect-redis";
import { Client } from "connect-redis";

export default ({ app, sessionClient }: { app: express.Application, sessionClient: Client }) => {
  const swaggerSpec: any = yaml.load(
    fs.readFileSync(path.join(__dirname, '../../build/openapi.yaml'), 'utf8'),
  );

  app.use(cors());
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: sessionClient
      }),
      saveUninitialized: false,
      secret: config.jwtSecretKey as string,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: false
      }
    })
  );

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
  app.use('/images', express.static('images'));
  app.use(config.api.prefix, routers());

  app.use(errorHandler);
};
