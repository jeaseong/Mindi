import { StatusError, imageDelete } from "../utils";
import { Service, Inject } from "typedi";
import { MongoDiaryModel, MongoStatModel } from "../models";
import winston from "winston";
import axios from "axios";
import dayjs from "dayjs";

@Service()
export default class MLService {
  constructor(
    private statModel: MongoStatModel,
    private diaryModel: MongoDiaryModel,
    @Inject("logger") private logger: winston.Logger,
  ) {}

  public async postSentimentAnalysis(
    feeling: string,
    userId?: string,
    diaryDate?: string,
    imageFileName?: string,
  ) {
    // 다이어리 업데이트의 경우, 날짜 확인 X
    if (userId && diaryDate) {
      const doc = await this.diaryModel.exists(userId, { diaryDate: dayjs(diaryDate).toDate() });
      if (doc) {
        throw new StatusError(400, "해당 날짜의 일기가 이미 존재합니다.");
      }
    }

    try {
      const { data } = await axios.post("/sentiment", { feeling });
      return data.result;
    } catch (error) {
      if (imageFileName) {
        await imageDelete(imageFileName);
      }
      throw new StatusError(400, "감정 분석에 실패하였습니다.");
    }
  }

  public async postKeywordAnalysis(userId: string, date: string) {
    const doc = await this.statModel.exists(userId, { monthly: dayjs(date).toDate() });
    if (doc) {
      throw new StatusError(400, "분석 결과가 이미 존재합니다.");
    }

    const from = dayjs(date).startOf("month").toDate();
    const to = dayjs(date).endOf("month").toDate();

    const docList = await this.diaryModel.findByDate(userId, from, to);
    if (docList.length == 0) {
      throw new StatusError(400, "다이어리가 존재하지 않습니다.");
    }

    try {
      const diaryList = docList.map((doc) => doc.diary);
      const { data } = await axios.post("/keywords", { diary: diaryList });
      const myKeyword = data.result;

      return { docList, myKeyword };
    } catch (error) {
      throw new StatusError(
        400,
        "키워드 분석에 실패하였습니다. 이달 다이어리를 3번 이상 작성했는지 확인해주세요.",
      );
    }
  }
}
