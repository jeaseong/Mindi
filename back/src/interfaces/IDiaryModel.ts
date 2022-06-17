import { BaseDiary, IDiary } from './IDiary';

export interface deleteResult {
  status: string; // "Succeess" or "Fail"
}

export interface IDiaryModel {
  create: (newDiary: BaseDiary) => Promise<IDiary>;
  updateOne: (filter: object, toUpdate: BaseDiary) => Promise<IDiary>;
  deleteOne: (id: string) => Promise<deleteResult>;
  findById: (id: string) => Promise<IDiary>;
  findByDate: (userId: string, date: string) => Promise<IDiary[]>;
  exists: (filter: Object) => Promise<Boolean>;
}
