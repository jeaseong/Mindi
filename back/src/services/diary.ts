import { BaseDiary, IDiaryModel } from '../interfaces/IDiary';
import { StatusError } from '../utils/error';

export default class DiaryService {
  constructor(private model: IDiaryModel) {}

  public async create(newDiary: BaseDiary) {
    const createdNewDoc = await this.model.create(newDiary);
    return createdNewDoc;
  }

  public async updateOne(id: string, toUpdate: object) {
    const docInfo = await this.model.findById(id);
    if (!docInfo) {
      throw new StatusError(400, '해당 아이디를 가진 일기를 찾을 수 없습니다.');
    }

    const filter = { _id: id };
    const updatedDoc = await this.model.updateOne(filter, toUpdate);
    return updatedDoc;
  }

  public async deleteOne(id: string) {
    const result = await this.model.deleteOne(id);
    if (result.deletedCount !== 1) {
      throw new StatusError(400, '삭제에 실패했습니다.');
    }
  }

  public async findByDate(id: string) {
    const docInfo = await this.model.findById(id);
    if (!docInfo) {
      throw new StatusError(400, '해당 날짜에 해당하는 데이터를 찾을 수 없습니다.');
    }
    return docInfo;
  }
}
