import expressLoader from './express';
import mongooseLoader from './mongoose';
import { Container } from 'typedi';
import { MongoDiaryModel } from '../interfaces/IDiary';

export default async ({ expressApp }: { expressApp: any }) => {
  await mongooseLoader();

  // Container.set('userModel', UserModel);
  Container.set('diaryModel', MongoDiaryModel);

  await expressLoader({ app: expressApp });
};
