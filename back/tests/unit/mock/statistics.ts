import { IStat, ISentiment } from "../../../src/interfaces";
import { faker } from "@faker-js/faker";
import { mockDiary } from "./diary";
import { ClientSession } from "mongoose";
import dayjs from "dayjs";

const monthly = dayjs("2022-05").toDate();
export const mockUserId = faker.database.mongodbObjectId();
export const mockObjectId = faker.database.mongodbObjectId();
const mockDiaryObjectId = faker.database.mongodbObjectId();

const sentiment: ISentiment = {
  fear: 2,
  surprised: 0,
  anger: 0,
  sadness: 2,
  happiness: 1,
  aversion: 0,
};

export const mockStat = {
  userId: mockUserId,
  monthly: monthly,
  keywords: [
    faker.word.noun(),
    faker.word.noun(),
    faker.word.noun(),
    faker.word.noun(),
    faker.word.noun(),
  ],
};

export const mockList = [{ _id: mockDiaryObjectId, ...mockDiary }];

export const mockResult = {
  ...mockStat,
  emotions: sentiment,
  reminder: [{ _id: mockDiaryObjectId, ...mockDiary }],
};

export const testStatisticsModel = {
  create: async (newResult: Partial<IStat>) => {
    return {
      _id: mockObjectId,
      ...mockResult,
    };
  },

  deleteOne: async (id: string) => {
    return;
  },

  findByDate: async (userId: string, date: Date) => {
    return {
      _id: mockObjectId,
      ...mockResult,
    };
  },

  exists: async (userId: string, filter: Partial<IStat>) => {
    return false;
  },

  deleteByUserId: async (userId: string, session: ClientSession) => {
    return;
  },
};
