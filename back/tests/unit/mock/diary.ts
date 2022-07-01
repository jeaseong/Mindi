import { IDiary, ISentiment } from "../../../src/interfaces";
import { faker } from "@faker-js/faker";
import { ClientSession } from "mongoose";
import dayjs, { UnitType } from "dayjs";

const date = dayjs("2022-06-25").toDate();
export const mockUserId = faker.database.mongodbObjectId();
export const mockObjectId = faker.database.mongodbObjectId();

const sentiment: ISentiment = {
  fear: 2,
  surprised: 0,
  anger: 0,
  sadness: 2,
  happiness: 1,
  aversion: 0,
};

export const mockDiary = {
  userId: mockUserId,
  diary: faker.lorem.paragraph(),
  feeling: faker.lorem.sentence(),
  sentiment: sentiment,
  videoId: "4yNzWULyPDQ",
  diaryDate: date,
};

export const testDiaryModel = {
  create: async (newDiary: Partial<IDiary>) => {
    return {
      _id: mockObjectId,
      ...mockDiary,
    };
  },

  updateOne: async (filter: Partial<IDiary>, toUpdate: Partial<IDiary>) => {
    return {
      _id: mockObjectId,
      ...mockDiary,
    };
  },

  deleteOne: async (id: string) => {
    return;
  },

  findByDate: async (userId: string, from: Date, to: Date) => {
    return [
      {
        _id: mockObjectId,
        ...mockDiary,
        diaryDate: date,
      },
    ];
  },

  exists: async (userId: string, filter: Partial<IDiary>) => {
    return false;
  },

  findEmotionalDiary: async (userId: string, emotion: string) => {
    return [
      {
        _id: mockObjectId,
        ...mockDiary,
      },
    ];
  },

  deleteByUserId: async (userId: string, session: ClientSession) => {
    return;
  },
};
