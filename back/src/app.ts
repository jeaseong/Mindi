import 'reflect-metadata';
import config from './config';
import loader from './loaders';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import logger from './loaders/winston';

async function appStart() {
  const app: express.Application = express();

  await loader({ expressApp: app });

  app.listen(config.port, () => {
    logger.info(`
    Mindi API Server
    is running on: http://localhost:${config.port}
    `);
  });

  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, world!');
  });
}

appStart();
