import 'reflect-metadata';
import config from './config';
import loader from './loaders';
import express from 'express';
import { Request, Response, NextFunction } from 'express';

// export async function appStart() {
const app: express.Application = express();

loader({ expressApp: app });

export const server = app.listen(config.port, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${config.port}`);
});

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, world!');
});

// appStart();
