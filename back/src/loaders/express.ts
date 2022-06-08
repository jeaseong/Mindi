import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import routers from '../api';
import errorHandler from '../api/middlewares/errorHandler';
import config from '../config';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import path from 'path';

export default ({ app }: { app: express.Application }) => {
  const swaggerSpec: any = yaml.load(path.join(__dirname, './modules/swagger.yaml'));

  app.use(cors());
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
  app.use(config.api.prefix, routers());

  app.use(errorHandler);
};
