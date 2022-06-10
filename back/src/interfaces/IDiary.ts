import { DiaryModel } from '../models/diary';

export interface BaseDiary {
  userId: string;
  diary: string;
  feeling: string;
  readonly createdDate: string; // "2022-6-10"
}

export interface Diary extends BaseDiary {
  _id: string;
}

interface deleteResult {
  status: string;
}

export interface IDiaryModel {
  create: (newDiary: BaseDiary) => Promise<Diary>;
  updateOne: (filter: object, toUpdate: BaseDiary) => Promise<Diary>;
  deleteOne: (id: string) => Promise<deleteResult>;
  findById: (id: string) => Promise<Diary>;
  findByDate: (date: string) => Promise<Diary[]>;
}

export class MongoDiaryModel implements IDiaryModel {
  async create(newDiary: BaseDiary): Promise<Diary> {
    return DiaryModel.create(newDiary);
  }

  async updateOne(filter: object, toUpdate: BaseDiary): Promise<Diary> {
    const option = { returnOriginal: false };
    return DiaryModel.findOneAndUpdate(filter, toUpdate, option).lean();
  }

  async deleteOne(id: string): Promise<deleteResult> {
    const result = await DiaryModel.deleteOne({ _id: id });
    if (result.deletedCount !== 1) {
      return { status: 'Fail' };
    }
    return { status: 'Ok' };
  }

  async findById(id: string): Promise<Diary> {
    return DiaryModel.findOne({ _id: id }).lean();
  }

  async findByDate(date: string): Promise<Diary[]> {
    return DiaryModel.find({ createdDate: date }).lean();
  }
}
