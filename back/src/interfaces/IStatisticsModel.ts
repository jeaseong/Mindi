import { BaseStat, IStat } from "./IStatistics";

export interface filterObj {
  [key: string]: string;
}

export interface IStatModel {
  create: (newDiary: BaseStat) => Promise<IStat>;
  updateOne: (filter: filterObj, toUpdate: BaseStat) => Promise<IStat>;
  deleteOne: (id: string) => Promise<void>;
  findByDate: (userId: string, date: string) => Promise<IStat>;
  exists: (filter: filterObj) => Promise<Boolean>;
}
