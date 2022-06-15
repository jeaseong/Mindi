export interface IComment {
  _id: string;
  post: string;
  content: string;
  author: string;
  parent: string;
  depth: number;
  createdAt: string;
  updatedAt: string;
}