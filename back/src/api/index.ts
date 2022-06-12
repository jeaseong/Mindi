import { Router } from 'express';
import auth from './routers/auth';
import user from './routers/user';
import diary from './routers/diary';

export default () => {
  const app = Router();

  user(app);
  auth(app);
  diary(app);

  return app;
};
