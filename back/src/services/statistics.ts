import { StatusError } from "../utils";
import { Service, Inject } from "typedi";
import { MongoDiaryModel, MongoStatModel } from "../models";
import { IStat } from "../interfaces";
import winston from "winston";

@Service()
export default class StatService {
  constructor(
    private statModel: MongoStatModel,
    private diaryModel: MongoDiaryModel,
    @Inject("logger") private logger: winston.Logger,
  ) {}

  public async findDiaryList(userId: string, date: string) {
    try {
      const docList = await this.diaryModel.findByDate(userId, date);
      return docList;
    } catch (error) {
      throw new StatusError(400, "리스트가 존재하지 않습니다.");
    }
  }

  public async create(newResult: Partial<IStat>) {
    const doc = await this.statModel.exists({ monthly: newResult.monthly });
    if (doc) {
      throw new StatusError(400, "분석 결과가 이미 존재합니다.");
    }

    try {
      const createdNewDoc = await this.statModel.create(newResult);
      return createdNewDoc;
    } catch (error) {
      throw new StatusError(400, "업로드에 실패했습니다.");
    }
  }

  public async updateOne(id: string, toUpdate: Partial<IStat>) {
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
