import { Schema, model, ClientSession } from "mongoose";
import { Service } from "typedi";
import { IDiary, IDiaryModel } from "../interfaces";

const DiarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    diary: {
      type: String,
      required: true,
    },
    feeling: {
      type: String,
      required: true,
    },
    sentiment: {
      type: Object,
      required: true,
    },
    diaryDate: {
      type: Date,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    imageFileName: {
      type: String,
      required: false,
    },
    imageFilePath: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const DiaryModel = model<IDiary>("Diary", DiarySchema);

@Service()
export class MongoDiaryModel implements IDiaryModel {
  async create(newDiary: Partial<IDiary>): Promise<IDiary> {
    const newDoc = await DiaryModel.create(newDiary);
    return newDoc.toObject();
  }

  async updateOne(filter: Partial<IDiary>, toUpdate: Partial<IDiary>): Promise<IDiary> {
    const option = { returnOriginal: false };
    return DiaryModel.findOneAndUpdate(filter, toUpdate, option).lean();
  }

  async deleteOne(id: string): Promise<void> {
    await DiaryModel.deleteOne({ _id: id });
  }

  async findByDate(userId: string, from: Date, to: Date): Promise<IDiary[]> {
    return DiaryModel.find({
      $and: [{ userId }, { diaryDate: { $gte: from, $lte: to } }],
    })
      .sort({ diaryDate: -1 })
      .lean();
  }

  async exists(userId: string, filter: Partial<IDiary>): Promise<Boolean> {
    return DiaryModel.exists({ $and: [{ userId }, filter] }).lean();
  }

  async findEmotionalDiary(userId: string, emotion: string): Promise<IDiary[]> {
    const a = DiaryModel.find({
      $and: [{ userId }, { [`sentiment.${emotion}`]: { $gt: 0 } }],
    })
      .sort({ [`sentiment.${emotion}`]: -1 })
      .limit(5)
      .lean();
    return a;
  }

  async deleteByUserId(userId: string, session: ClientSession): Promise<void> {
    await DiaryModel.deleteMany({ userId }).session(session);
  }

  async findByUserId(userId: string): Promise<IDiary[]> {
    return DiaryModel.find({ userId }).lean();
  }
}
