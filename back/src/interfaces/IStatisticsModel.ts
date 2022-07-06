import { ClientSession } from "mongoose";
import { IStat } from "./IStatistics";

export interface IStatModel {
  create: (newResult: Partial<IStat>) => Promise<IStat>;
  updateOne: (filter: Partial<IStat>, toUpdate: Partial<IStat>) => Promise<IStat>;
  deleteOne: (id: string) => Promise<void>;
  findByDate: (userId: string, date: Date) => Promise<IStat>;
  exists: (userId: string, filter: Partial<IStat>) => Promise<Boolean>;
  deleteByUserId: (userId: string, session: ClientSession) => Promise<void>;
}
