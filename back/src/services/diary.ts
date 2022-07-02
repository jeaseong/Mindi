import { IDiary } from "../interfaces";
import { StatusError, imageDelete } from "../utils";
import { Service, Inject } from "typedi";
import { MongoDiaryModel } from "../models";
import dayjs, { UnitType } from "dayjs";
import winston from "winston";

@Service()
export default class DiaryService {
  constructor(
    private diaryModel: MongoDiaryModel,
    @Inject("logger") private logger: winston.Logger,
  ) {}

  public async create(newDiary: Partial<IDiary>) {
    try {
      const createdNewDoc = await this.diaryModel.create(newDiary);
      return createdNewDoc;
    } catch (error) {
      if (newDiary.imageFileName) {
        await imageDelete(newDiary.imageFileName);
      }
      throw new StatusError(400, "업로드에 실패했습니다.");
    }
  }

  public async updateOne(id: string, toUpdate: Partial<IDiary>, imageFileName?: string) {
    try {
      const filter = { _id: id };
      const updatedDoc = await this.diaryModel.updateOne(filter, toUpdate);
      if (imageFileName && imageFileName !== toUpdate.imageFileName) {
        await imageDelete(imageFileName); // 기존 이미지 삭제
      }
      return updatedDoc;
    } catch (error) {
      if (toUpdate.imageFileName && imageFileName !== toUpdate.imageFileName) {
        await imageDelete(toUpdate.imageFileName); // 새로 업로드했던 이미지 삭제
      }
      throw new StatusError(400, "업데이트에 실패했습니다.");
    }
  }

  public async deleteOne(id: string, imageFileName?: string) {
    try {
      await this.diaryModel.deleteOne(id);
      if (imageFileName) {
        await imageDelete(imageFileName);
      }
    } catch (error) {
      throw new StatusError(400, "삭제에 실패했습니다.");
    }
  }

  public async findByDate(userId: string, date: string, set: UnitType) {
    const from = dayjs(date).startOf(set).toDate();
    const to = dayjs(date).endOf(set).toDate();
    const docList = await this.diaryModel.findByDate(userId, from, to);
    return docList;
  }
}
