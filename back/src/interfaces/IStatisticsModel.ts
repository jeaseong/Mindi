import { IStat } from "./IStatistics";

export interface IStatModel {
  create: (newDiary: Partial<IStat>) => Promise<IStat>;
  updateOne: (filter: Partial<IStat>, toUpdate: Partial<IStat>) => Promise<IStat>;
  deleteOne: (id: string) => Promise<void>;
  findByDate: (userId: string, date: string) => Promise<IStat>;
  exists: (filter: Partial<IStat>) => Promise<Boolean>;
}
