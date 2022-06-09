import { DiaryModel } from '../models/diary';

export interface BaseDiary {
  userId: string;
  diary: string;
  feeling: string;
}

export interface Diary extends BaseDiary {
  _id: string;
}

export interface IDiaryModel {
  create: Function;
  deleteOne: Function;
  findById: Function;
  updateOne: Function;
}

export class MongoDiaryModel implements IDiaryModel {
  async create(newDiary: BaseDiary): Promise<Diary> {
    return DiaryModel.create(newDiary);
  }

  async updateOne(filter: object, toUpdate: object): Promise<Diary> {
    const option = { returnOriginal: false };
    return DiaryModel.findOneAndUpdate(filter, toUpdate, option).lean();
  }

  async deleteOne(id: string): Promise<object> {
    return DiaryModel.deleteOne({ _id: id });
  }

  async findById(id: string): Promise<Diary> {
    return DiaryModel.findOne({ _id: id }).lean();
  }
}
