export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  colorScheme: Array<string>;
  recentLogin: string;
  createdAt: string;
  updatedAt: string;
}