import { Container } from 'typedi';
import { MongoUserModel } from "../models/user";
import { MongoDiaryModel } from '../models/diary';

export default () => {
  Container.set('mongoUserModel', MongoUserModel);
  Container.set('mongoDiaryModel', MongoDiaryModel);
};
