import { IStat } from "./IStatistics";

export interface IStatModel {
  create: (newResult: Partial<IStat>) => Promise<IStat>;
  deleteOne: (id: string) => Promise<void>;
  findByDate: (userId: string, date: Date) => Promise<IStat>;
  exists: (userId: string, filter: Partial<IStat>) => Promise<Boolean>;
}
