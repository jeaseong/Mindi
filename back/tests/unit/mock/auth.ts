import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

const mockObjectId = faker.database.mongodbObjectId();
const dayString = dayjs().toISOString();
export const mockEmail = faker.internet.email();
export const mockName = faker.name.findName();
const role = "user";
export const mockPassword = faker.internet.password();
const colorScheme: Object = {
  fear: "#d9c7c7",
  surprised: "#b00067",
  anger: "#cef550",
  sadness: "#f65469",
  happiness: "#b7c6c9",
  aversion: "#3399ff",
};

export const userObject = {
  _id: mockObjectId,
  name: mockName,
  email: mockEmail,
  password: mockPassword,
  role: role,
  colorScheme: colorScheme,
  recentLogin: dayString,
  createdAt: dayString,
  updatedAt: dayString,
};

export const SignUpTestModel = {
  create: async (email: string, name: string, password: string) => {
    userObject.password = password;
    return userObject;
  },

  update: async (filter: Object, fieldToUpdate: Object) => {
    return userObject;
  },

  delete: async (userId: string) => {
    return;
  },

  findOne: async (filter: Object) => {
    return userObject;
  },

  findMany: async (filter: Object) => {
    return [userObject, userObject];
  },

  exists: async (filter: Object) => {
    return false;
  },
};

export const SignInTestModel = {
  create: async (email: string, name: string, password: string) => {
    userObject.password = password;
    return userObject;
  },

  update: async (filter: Object, fieldToUpdate: Object) => {
    return userObject;
  },

  delete: async (userId: string) => {
    return;
  },

  findOne: async (filter: Object) => {
    return userObject;
  },

  findMany: async (filter: Object) => {
    return [userObject, userObject];
  },

  exists: async (filter: Object) => {
    return true;
  },
};
