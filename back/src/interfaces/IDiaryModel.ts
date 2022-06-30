import { IDiary } from "./IDiary";

export interface IDiaryModel {
  create: (newDiary: Partial<IDiary>) => Promise<IDiary>;
  updateOne: (filter: Partial<IDiary>, toUpdate: Partial<IDiary>) => Promise<IDiary>;
  deleteOne: (id: string) => Promise<void>;
  findByDate: (userId: string, date: string) => Promise<IDiary[]>;
  exists: (userId: string, filter: Partial<IDiary>) => Promise<Boolean>;
  findMostEmotionalDiary: (userId: string, emotion: string) => Promise<IDiary[]>;
}
