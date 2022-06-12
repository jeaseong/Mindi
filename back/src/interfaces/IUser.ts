export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  recentLogin: string;
  createdAt: string;
  updatedAt: string;
}

// export interface IUser extends Partial<User> {}

// export interface IUser {
//   _id?: string;
//   name?: string;
//   email?: string;
//   password?: string;
//   role?: string;
//   recentLogin?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }