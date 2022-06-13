export interface IPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  comments: Array<string>;
  createdAt: string;
  updatedAt: string;
}