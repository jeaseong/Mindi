import { StatusError } from "../utils/error";
import { Service, Inject } from "typedi";
import winston from "winston";
import { MongoStatModel } from "../models/statistics";
import { BaseStat } from "../interfaces/IStatistics";

@Service()
export default class StatService {
  constructor(
    private statModel: MongoStatModel,
    @Inject("logger") private logger: winston.Logger,
  ) {}

  public async create(newResult: BaseStat) {
    try {
      const createdNewDoc = await this.statModel.create(newResult);
      return createdNewDoc;
    } catch (error) {
      throw new StatusError(400, "업로드에 실패했습니다.");
    }
  }

  public async updateOne(id: string, toUpdate: BaseStat) {
    try {
      const filter = { _id: id };
      const updatedDoc = await this.statModel.updateOne(filter, toUpdate);
      return updatedDoc;
    } catch (error) {
      throw new StatusError(400, "업데이트에 실패했습니다.");
    }
  }

  public async deleteOne(id: string) {
    try {
      await this.statModel.deleteOne(id);
    } catch (error) {
      throw new StatusError(400, "삭제에 실패했습니다.");
    }
  }

  public async findByDate(userId: string, monthly: string) {
    const docList = await this.statModel.findByDate(userId, monthly);
    return docList;
  }
}
