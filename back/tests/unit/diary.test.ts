import DiaryService from "../../src/services/diary";
import { BaseDiary, IDiary } from "../../src/interfaces/IDiary";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import logger from "../../src/loaders/winston";
import { IDiaryModel } from "../../src/interfaces/IDiaryModel";

describe("Diary Service Test", () => {
  const today = dayjs().locale("ko").format("YYYY-MM-DD");
  const mockUserId = faker.database.mongodbObjectId();
  const mockObjectId = faker.database.mongodbObjectId();

  const sentiment = {
    fear: 2,
    surprised: 0,
    anger: 0,
    sadness: 2,
    happiness: 1,
    aversion: 0,
  };

  const newDiary = {
    userId: mockUserId,
    diary: faker.lorem.paragraph(),
    feeling: faker.lorem.sentence(),
    sentiment: sentiment,
    diaryDate: today,
  };

  const toUpdate = {
    userId: mockUserId,
    diary: faker.lorem.paragraph(),
    feeling: faker.lorem.sentence(),
    sentiment: sentiment,
    diaryDate: today,
  };

  class testDiaryModel implements IDiaryModel {
    async create(newDiary: BaseDiary) {
      return {
        _id: mockObjectId,
        ...newDiary,
      };
    }

    async updateOne(filter: object, toUpdate: BaseDiary) {
      const filterCopy = { _id: mockObjectId }; // filter 객체로 들어와야 하는 값
      return {
        ...filterCopy,
        ...toUpdate,
      };
    }

    async deleteOne(id: string) {
      return;
    }

    async findById(id: string) {
      return {
        _id: id,
        ...toUpdate,
      };
    }

    async findByDate(userId: string, date: string) {
      return [
        {
          _id: mockObjectId,
          ...toUpdate,
          diaryDate: date,
        },
      ];
    }
  }

  const diaryService = new DiaryService(new testDiaryModel(), logger);

  it("create new diary", async () => {
    expect(await diaryService.create(newDiary)).toEqual({
      _id: mockObjectId,
      ...newDiary,
      createdDate: today,
    });
  });

  it("update a diary", async () => {
    expect(await diaryService.updateOne(mockObjectId, toUpdate)).toEqual({
      _id: mockObjectId,
      ...toUpdate,
    });
  });

  it("delete a diary", async () => {
    expect(await diaryService.deleteOne(mockObjectId)).toEqual(void {});
  });

  it("find a diary list by date", async () => {
    expect(await diaryService.findByDate(mockUserId, today)).toEqual([
      {
        _id: mockObjectId,
        ...toUpdate,
      },
    ]);
  });

  it("find a diary by object id", async () => {
    expect(await diaryService.findById(mockObjectId)).toEqual({
      _id: mockObjectId,
      ...toUpdate,
    });
  });
});
