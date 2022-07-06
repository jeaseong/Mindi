import { StatusError } from "../utils";
import { Service, Inject } from "typedi";
import { MongoDiaryModel, MongoStatModel } from "../models";
import { IStat, ISentiment, IDiary } from "../interfaces";
import winston from "winston";
import dayjs from "dayjs";

@Service()
export default class StatService {
  constructor(
    private statModel: MongoStatModel,
    private diaryModel: MongoDiaryModel,
    @Inject("logger") private logger: winston.Logger,
  ) {}

  public async analysis(docList: Array<IDiary>) {
    let myEmotion: ISentiment = {
      fear: 0,
      surprised: 0,
      anger: 0,
      sadness: 0,
      happiness: 0,
      aversion: 0,
    };

    for (const doc of docList) {
      const { fear, surprised, anger, sadness, happiness, aversion } = doc.sentiment;
      myEmotion.fear = fear > 0 ? myEmotion.fear + 1 : myEmotion.fear;
      myEmotion.surprised = surprised > 0 ? myEmotion.surprised + 1 : myEmotion.surprised;
      myEmotion.anger = anger > 0 ? myEmotion.anger + 1 : myEmotion.anger;
      myEmotion.sadness = sadness > 0 ? myEmotion.sadness + 1 : myEmotion.sadness;
      myEmotion.happiness = happiness > 0 ? myEmotion.happiness + 1 : myEmotion.happiness;
      myEmotion.aversion = aversion > 0 ? myEmotion.aversion + 1 : myEmotion.aversion;
    }

    // 가장 자주 관찰된 감정 추리기
    let mostEmotion = Object.entries(myEmotion).reduce((a, b) => (a[1] > b[1] ? a : b));

    // 높은 값이 여러 개일 때, 랜덤하게 하나 지정
    const found = Object.entries(myEmotion).filter((emotion) => emotion[1] === mostEmotion[1]);
    if (found.length > 1) {
      const randomIdx = Math.floor(Math.random() * found.length);
      mostEmotion = found[randomIdx];
    }

    return { myEmotion, mostEmotion };
  }

  public async create(newStat: Partial<IStat>, date: string, docList: Array<IDiary>) {
    try {
      const { myEmotion, mostEmotion } = await this.analysis(docList);
      const reminder = await this.diaryModel.findEmotionalDiary(newStat.userId!, mostEmotion[0]);

      const newResult: Partial<IStat> = {
        ...newStat,
        monthly: dayjs(date).toDate(),
        emotions: myEmotion,
        reminder: reminder,
      };

      const createdNewDoc = await this.statModel.create(newResult);
      return createdNewDoc;
    } catch (error) {
      throw new StatusError(400, "업로드에 실패했습니다.");
    }
  }

  public async updateOne(newResult: Partial<IStat>, date: string, docList: Array<IDiary>) {
    try {
      const filter = { monthly: dayjs(date).toDate() };
      const { myEmotion, mostEmotion } = await this.analysis(docList);
      const reminder = await this.diaryModel.findEmotionalDiary(newResult.userId!, mostEmotion[0]);

      const toUpdate: Partial<IStat> = {
        ...newResult,
        emotions: myEmotion,
        reminder: reminder,
      };

      const createdNewDoc = await this.statModel.updateOne(filter, toUpdate);
      return createdNewDoc;
    } catch (error) {
      throw new StatusError(400, "업로드에 실패했습니다.");
    }
  }

  public async deleteOne(id: string) {
    try {
      await this.statModel.deleteOne(id);
    } catch (error) {
      throw new StatusError(400, "삭제에 실패했습니다.");
    }
  }

  public async findByDate(userId: string, date: string) {
    const monthly = dayjs(date).toDate();
    const doc = await this.statModel.findByDate(userId, monthly);
    return doc;
  }
}
