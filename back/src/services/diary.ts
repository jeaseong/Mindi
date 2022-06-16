import { BaseDiary } from '../interfaces/IDiary';
import { StatusError } from '../utils/error';
import { Service, Inject } from 'typedi';
import { MongoDiaryModel } from '../models/diary';
import { MongoUserModel } from '../models/user';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

@Service()
export default class DiaryService {
  constructor(
    private diaryModel: MongoDiaryModel,
    private userModel: MongoUserModel,
    @Inject('logger') private logger: any,
  ) {}

  public async create(newDiary: BaseDiary) {
    const userExists = await this.userModel.exists({ _id: newDiary.userId });

    if (!userExists) {
      throw new StatusError(400, '사용자가 존재하지 않습니다.');
    }

    // 일기 작성 날짜 생성
    const createdDate = dayjs().locale('ko').format('YYYY-MM-DD');
    newDiary = { ...newDiary, createdDate };

    const createdNewDoc = await this.diaryModel.create(newDiary);
    return createdNewDoc;
  }

  public async updateOne(id: string, toUpdate: BaseDiary) {
    const userExists = await this.userModel.exists({ _id: toUpdate.userId });

    if (!userExists) {
      throw new StatusError(400, '사용자가 존재하지 않습니다.');
    }

    const filter = { _id: id };
    const doc = await this.diaryModel.exists(filter);
    if (!doc) {
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

  public async findByDate(userId: string, date: string) {
    const docList = await this.diaryModel.findByDate(userId, date);
    return docList;
  }

  public async findById(id: string) {
    const docInfo = await this.diaryModel.findById(id);
    if (!docInfo) {
      throw new StatusError(400, '해당 아이디를 가진 일기를 찾을 수 없습니다.');
    }

    return docInfo;
  }
}
