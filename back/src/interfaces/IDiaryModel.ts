import { IDiary } from "./IDiary";

export interface IDiaryModel {
  create: (newDiary: Partial<IDiary>) => Promise<IDiary>;
  updateOne: (filter: Partial<IDiary>, toUpdate: Partial<IDiary>) => Promise<IDiary>;
  deleteOne: (id: string) => Promise<void>;
  findById: (id: string) => Promise<IDiary>;
  findByDate: (userId: string, date: string) => Promise<IDiary[]>;
  exists: (filter: Partial<IDiary>) => Promise<Boolean>;
}
