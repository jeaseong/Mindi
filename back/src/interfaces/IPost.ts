import { IComment } from "./IComment";

export interface IPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  comments: Array<IComment>;
  createdAt: string;
  updatedAt: string;
}