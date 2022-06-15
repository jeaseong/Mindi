import DiaryService from '../../src/services/diary';
import { BaseDiary, IDiary } from '../../src/interfaces/IDiary';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import logger from '../../src/loaders/winston';

describe('Diary Service Test', () => {
  const today = dayjs().locale('ko').format('YYYY-MM-DD');
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
      const filterCopy = { _id: mockObjectId }; // filter 객체로 들어와야 하는 값
      return {
        ...filterCopy,
        ...toUpdate,
      };
    },

    deleteOne: async (id: string) => {
      return { status: 'Success' };
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

    exists: async (filter: Object) => {
      if (filter) {
        return true;
      } else {
        return false;
      }
    },
  };

  const diaryService = new DiaryService(testDiaryModel, logger);

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
