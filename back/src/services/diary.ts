import { BaseDiary, IDiaryModel } from '../interfaces/IDiary';
import { StatusError } from '../utils/error';
import { Service, Inject } from 'typedi';
import { MongoDiaryModel } from '../models/diary';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

@Service()
export default class DiaryService {
  constructor(private diaryModel: MongoDiaryModel, @Inject('logger') private logger: any) {}

  public async create(newDiary: BaseDiary) {
    // 일기 작성 날짜 생성
    const createdDate = dayjs().locale('ko').format('YYYY-MM-DD');
    newDiary = { ...newDiary, createdDate };

    const createdNewDoc = await this.diaryModel.create(newDiary);
    return createdNewDoc;
  }

  public async updateOne(id: string, toUpdate: BaseDiary) {
    const filter = { _id: id };
    const docInfo = await this.diaryModel.exists(filter);
    if (!docInfo) {
      throw new StatusError(400, '해당 아이디를 가진 일기를 찾을 수 없습니다.');
    }

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
