import { BaseDiary } from "../interfaces/IDiary";
import { StatusError } from "../utils/error";
import { Service, Inject } from "typedi";
import { MongoDiaryModel } from "../models/diary";

@Service()
export default class DiaryService {
  constructor(private diaryModel: MongoDiaryModel, @Inject("logger") private logger: any) {}

  public async create(userId: string, newDiary: Partial<IDiary>) {
    const doc = await this.diaryModel.exists(userId, { diaryDate: newDiary.diaryDate });
    if (doc) {
      throw new StatusError(400, "해당 날짜의 일기가 이미 존재합니다.");
    }

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

  public async updateOne(id: string, toUpdate: BaseDiary) {
    const filter = { _id: id };
    try {
      const updatedDoc = await this.diaryModel.updateOne(filter, toUpdate);
      return updatedDoc;
    } catch (error) {
      throw new StatusError(400, "업데이트에 실패했습니다.");
    }
  }

  public async deleteOne(id: string) {
    try {
      await this.diaryModel.deleteOne(id);
    } catch (error) {
      throw new StatusError(400, "삭제에 실패했습니다.");
    }
  }

  public async findByDate(userId: string, date: string) {
    const docList = await this.diaryModel.findByDate(userId, date);
    return docList;
  }

  public async findById(id: string) {
    const docInfo = await this.diaryModel.findById(id);
    if (!docInfo) {
      throw new StatusError(400, "일기가 존재하지 않습니다.");
    }

    return docInfo;
  }
}
