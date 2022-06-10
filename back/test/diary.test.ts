import { describe, it } from 'mocha';
import { expect } from 'chai';
import DiaryService from '../src/services/diary';
import { BaseDiary, Diary } from '../src/interfaces/IDiary';

// 현재 날짜 기준으로 테스트 실행

describe('Sample Test', () => {
  const newDiary = {
    userId: '1234',
    diary: 'oh NO',
    feeling: 'HAPPY',
    createdDate: '0',
  };

  const toUpdate = {
    userId: '12345',
    diary: 'oh NOPE',
    feeling: 'HAPPY',
    createdDate: '2022-6-10',
  };

  const testDiaryModel = {
    create: async (newDiary: BaseDiary) => {
      return {
        _id: 'mock-id',
        ...newDiary,
      };
    },

    updateOne: async (filter: object, toUpdate: BaseDiary) => {
      return {
        _id: 'mock-id',
        ...toUpdate,
      };
    },

    deleteOne: async (id: string) => {
      return { status: 'Ok' };
    },

    findById: async (id: string) => {
      return {
        _id: id,
        ...newDiary,
        createdDate: '2022-6-10',
      };
    },

    findByDate: async (date: string) => {
      return [
        {
          _id: 'mock-id',
          ...newDiary,
          createdDate: '2022-6-10',
        },
      ];
    },
  };

  const diaryService = new DiaryService(testDiaryModel);

  it('create new diary', async () => {
    expect(await diaryService.create(newDiary)).to.deep.equal({
      _id: 'mock-id',
      ...newDiary,
      createdDate: '2022-6-10',
    });
  });

  it('update a diary', async () => {
    expect(await diaryService.updateOne('mock-id', toUpdate)).to.deep.equal({
      _id: 'mock-id',
      ...toUpdate,
      createdDate: '2022-6-10',
    });
  });

  it('delete a diary', async () => {
    expect(await diaryService.deleteOne('mock-id')).to.deep.equal(void {});
  });

  // it('find a diary by object id', async () => {
  //   expect(await diaryService.findById('mock-id')).to.deep.equal({
  //     _id: 'mock-id',
  //     ...newDiary,
  //   });
  // });

  it('find a diary list by date', async () => {
    expect(await diaryService.findByDate('2022-6-10')).to.deep.equal([
      {
        _id: 'mock-id',
        ...newDiary,
        createdDate: '2022-6-10',
      },
    ]);
  });
});
