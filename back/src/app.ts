import 'reflect-metadata';
import config from './config';
import loader from './loaders';
import express from 'express';
import { Request, Response, NextFunction } from 'express';

const app: express.Application = express();

async function appStart(app: express.Application) {
  await loader({ expressApp: app });

  app.listen(config.port, () => {
    console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${config.port}`);
  });

  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, world!');
  });
}

appStart(app);

export default app; // for mocha test