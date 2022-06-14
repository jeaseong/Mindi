import { Container } from 'typedi';
import { MongoUserModel } from "../models/user";
import { MongoDiaryModel } from '../models/diary';
import logger from "./winston";

export default () => {
  Container.set('mongoUserModel', MongoUserModel);
  Container.set('mongoDiaryModel', MongoDiaryModel);
  Container.set('logger', logger);
};
