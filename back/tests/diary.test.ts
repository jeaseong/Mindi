import DiaryService from '../src/services/diary';
import { BaseDiary, IDiary } from '../src/interfaces/IDiary';
import { faker } from '@faker-js/faker';

describe('Diary Service Test', () => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const now_KR = new Date(utc + KR_TIME_DIFF);
  const today = now_KR.getFullYear() + '-' + (now_KR.getMonth() + 1) + '-' + now_KR.getDate();

  const mockUserId = faker.database.mongodbObjectId();
  const mockObjectId = faker.database.mongodbObjectId();

  const newDiary = {
    userId: mockUserId,
    diary: faker.lorem.paragraph(),
    feeling: faker.lorem.sentence(),
    createdDate: '0',
  };

  const toUpdate = {
    userId: mockUserId,
    diary: faker.lorem.paragraph(),
    feeling: faker.lorem.sentence(),
    createdDate: today,
  };

  const testDiaryModel = {
    create: async (newDiary: BaseDiary) => {
      return {
        _id: mockObjectId,
        ...newDiary,
      };
    },

    updateOne: async (filter: object, toUpdate: BaseDiary) => {
      const filterCheck = { _id: mockObjectId }; // filter 객체로 들어와야 하는 값
      if (filter !== filterCheck) void {};
      return {
        ...filterCheck,
        ...toUpdate,
      };
    },

    deleteOne: async (id: string) => {
      return { status: 'Ok' };
    },

    findById: async (id: string) => {
      return {
        _id: id,
        ...toUpdate,
      };
    },

    findByDate: async (date: string) => {
      return [
        {
          _id: mockObjectId,
          ...toUpdate,
          createdDate: date,
        },
      ];
    },
  };

  const diaryService = new DiaryService(testDiaryModel);

  it('create new diary', async () => {
    expect(await diaryService.create(newDiary)).toEqual({
      _id: mockObjectId,
      ...newDiary,
      createdDate: today,
    });
  });

  it('update a diary', async () => {
    expect(await diaryService.updateOne(mockObjectId, toUpdate)).toEqual({
      _id: mockObjectId,
      ...toUpdate,
    });
  });

  it('delete a diary', async () => {
    expect(await diaryService.deleteOne(mockObjectId)).toEqual(void {});
  });

  it('find a diary list by date', async () => {
    expect(await diaryService.findByDate(today)).toEqual([
      {
        _id: mockObjectId,
        ...toUpdate,
      },
    ]);
  });
});
