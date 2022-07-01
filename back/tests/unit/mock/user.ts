import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export const mockObjectId = faker.database.mongodbObjectId();
export const dayString = dayjs().toISOString();
export const mockEmail = faker.internet.email();
export const mockName = faker.name.findName();
export const role = "user";
export const mockPassword = faker.internet.password();

export const userObject = {
  _id: mockObjectId,
  name: mockName,
  email: mockEmail,
  password: mockPassword,
  role: role,
  colorScheme: [""],
  recentLogin: dayString,
  createdAt: dayString,
  updatedAt: dayString
};

export const fieldToUpdateUser = {
  name: mockName,
  password: mockPassword,
};

export const TestUserModel = {
  async create(email: string, name: string, password: string) {
    return userObject;
  },

  async update(filter: Object, fieldToUpdate: Object) {
    return userObject;
  },

  async delete(userId: string) {
    return;
  },

  async findOne(filter: Object) {
    return userObject;
  },

  async findMany(filter: Object) {
    return [
      userObject,
      userObject,
    ];
  },

  async exists(filter: Object) {
    return true;
  }
}

export {};