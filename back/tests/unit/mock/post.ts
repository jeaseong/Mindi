import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { ClientSession } from "mongoose";
import { IPost } from "../../../src/interfaces";

const dayString = dayjs().toISOString();
export const mockObjectId = faker.database.mongodbObjectId();
export const mockUserObjectId = faker.database.mongodbObjectId();
const mockTitle = faker.lorem.word();
const mockContent = faker.lorem.sentence();

export const mockReqBody = {
  title: mockTitle,
  content: mockContent,
  author: mockUserObjectId,
};

export const mockPost = {
  _id: mockObjectId,
  title: mockTitle,
  content: mockContent,
  author: mockUserObjectId,
  comments: 0,
  createdAt: dayString,
  updatedAt: dayString,
};

export const fieldToUpdate = {
  title: mockTitle,
  content: mockContent,
};

export const testPostModel = {
  create: async (body: Partial<IPost>) => {
    return mockPost;
  },

  update: async (filter: Object, fieldToUpdate: Object) => {
    return mockPost;
  },

  delete: async (postId: string) => {
    return;
  },

  findOne: async (filter: Object) => {
    return mockPost;
  },

  findMany: async (filter: Object | null, query: { page: number; limit: number }) => {
    return [mockPost, mockPost];
  },

  exists: async (filter: Object) => {
    return true;
  },

  deleteByUserId: async (userId: string, session: ClientSession) => {
    return;
  },
};
