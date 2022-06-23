import { Container } from 'typedi';
import { MongoUserModel } from "../models/user";
import { MongoDiaryModel } from '../models/diary';
import logger from "./winston";
import { MongoCommentModel } from "../models/comment";
import { MongoPostModel } from "../models/post";

export default () => {
  Container.set('mongoUserModel', MongoUserModel);
  Container.set('mongoDiaryModel', MongoDiaryModel);
  Container.set('logger', logger);
  Container.set("mongoPostModel", MongoPostModel);
  Container.set("mongoCommentModel", MongoCommentModel);
};
