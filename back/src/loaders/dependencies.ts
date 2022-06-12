import { Container } from 'typedi';
import { TestUserModel, MongoUserModel } from '../interfaces/IUserModel';
import { MongoDiaryModel } from '../models/diary';

export default () => {
  Container.set('mongoUserModel', MongoUserModel);
  Container.set('testUserModel', TestUserModel);
  Container.set('mongoDiaryModel', MongoDiaryModel);
};
