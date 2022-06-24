import { BaseDiary, IDiary } from "./IDiary";

export interface filterObj {
  [key: string]: string;
}

export interface IDiaryModel {
  create: (newDiary: BaseDiary) => Promise<IDiary>;
  updateOne: (filter: filterObj, toUpdate: BaseDiary) => Promise<IDiary>;
  deleteOne: (id: string) => Promise<void>;
  findById: (id: string) => Promise<IDiary>;
  findByDate: (userId: string, date: string) => Promise<IDiary[]>;
}
