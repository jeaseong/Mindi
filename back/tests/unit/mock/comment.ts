import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { ClientSession } from "mongoose";
import { IComment } from "../../../src/interfaces";

const dayString = dayjs().toISOString();
export const mockObjectId = faker.database.mongodbObjectId();
export const mockUserObjectId = faker.database.mongodbObjectId();
export const mockPostObjectId = faker.database.mongodbObjectId();
export const mockParentObjectId = faker.database.mongodbObjectId();
const mockContent = faker.lorem.sentence();

export const mockReqBody = {
  post: mockPostObjectId,
  parent: mockParentObjectId,
  depth: 0,
  content: mockContent,
  author: mockUserObjectId,
};

export const mockComment = {
  _id: mockObjectId,
  post: mockPostObjectId,
  content: mockContent,
  author: mockUserObjectId,
  parent: mockParentObjectId,
  depth: 0,
  createdAt: dayString,
  updatedAt: dayString,
};

export const fieldToUpdate = {
  content: mockContent,
};

export const testCommentModel = {
  create: async (body: Partial<IComment>) => {
    return mockComment;
  },

  update: async (filter: Object, fieldToUpdate: Object) => {
    return mockComment;
  },

  delete: async (commentId: string) => {
    return;
  },

  findOne: async (filter: Object) => {
    return mockComment;
  },

  findMany: async (filter: Object | null, query: { page: number; limit: number }) => {
    return [mockComment, mockComment];
  },

  exists: async (filter: Object) => {
    return true;
  },

  deleteByUserId: async (userId: string, session: ClientSession) => {
    return;
  },
};
