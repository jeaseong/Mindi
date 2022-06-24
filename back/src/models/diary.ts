import { Schema, model } from "mongoose";
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

  async findByDate(userId: string, date: string): Promise<IDiary[]> {
    return DiaryModel.find({
      $and: [{ userId }, { diaryDate: { $regex: `^${date}` } }],
    })
      .sort({ createdAt: -1 })
      .lean();
  }

  async exists(userId: string, filter: Partial<IDiary>): Promise<Boolean> {
    return DiaryModel.exists({ $and: [{ userId }, filter] }).lean();
  }

  async findMostEmotionalDiary(userId: string, emotion: string): Promise<IDiary[]> {
    const a = DiaryModel.find({
      $and: [{ userId }, { [`sentiment.${emotion}`]: { $gt: 0 } }],
    })
      .sort({ [`sentiment.${emotion}`]: -1 })
      .lean();
    return a;
  }
}
