import { IDiary } from "./IDiary";

export interface IDiaryModel {
  create: (newDiary: Partial<IDiary>) => Promise<IDiary>;
  updateOne: (filter: Partial<IDiary>, toUpdate: Partial<IDiary>) => Promise<IDiary>;
  deleteOne: (id: string) => Promise<void>;
  findByDate: (userId: string, from: Date, to: Date) => Promise<IDiary[]>;
  exists: (userId: string, filter: Partial<IDiary>) => Promise<Boolean>;
  findEmotionalDiary: (userId: string, emotion: string) => Promise<IDiary[]>;
}
