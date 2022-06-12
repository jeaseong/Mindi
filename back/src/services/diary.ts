import { BaseDiary, IDiaryModel } from '../interfaces/IDiary';
import { StatusError } from '../utils/error';

export default class DiaryService {
  constructor(private diaryModel: IDiaryModel) {}

  public async create(newDiary: BaseDiary) {
    // 일기 작성 날짜 생성
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const now_KR = new Date(utc + KR_TIME_DIFF);
    const createdDate =
      now_KR.getFullYear() + '-' + (now_KR.getMonth() + 1) + '-' + now_KR.getDate();
    newDiary = { ...newDiary, createdDate };

    const createdNewDoc = await this.diaryModel.create(newDiary);
    return createdNewDoc;
  }

  public async updateOne(id: string, toUpdate: BaseDiary) {
    const docInfo = await this.diaryModel.findById(id);
    if (!docInfo) {
      throw new StatusError(400, '해당 아이디를 가진 일기를 찾을 수 없습니다.');
    }

    const filter = { _id: id };
    const updatedDoc = await this.diaryModel.updateOne(filter, toUpdate);
    return updatedDoc;
  }

  public async deleteOne(id: string) {
    const result = await this.diaryModel.deleteOne(id);
    if (result.status === 'Fail') {
      throw new StatusError(400, '삭제에 실패했습니다.');
    }
  }

  public async findByDate(date: string) {
    const docList = await this.diaryModel.findByDate(date);
    return docList;
  }
}
