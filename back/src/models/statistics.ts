import { Schema, model } from "mongoose";
import { Service } from "typedi";
import { BaseStat, IStat } from "../interfaces/IStatistics";
import { IStatModel, filterObj } from "../interfaces/IStatisticsModel";

const StatisticsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    monthly: {
      type: String,
      required: true,
    },
    keywords: {
      type: Object,
      required: true,
    },
    emotions: {
      type: Object,
      required: true,
    },
    diaries: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

const StatisticsModel = model<IStat>("Statistics", StatisticsSchema);

@Service()
export class MongoStatModel implements IStatModel {
  async create(newDiary: BaseStat): Promise<IStat> {
    const newDoc = await StatisticsModel.create(newDiary);
    return newDoc.toObject();
  }

  async updateOne(filter: filterObj, toUpdate: BaseStat): Promise<IStat> {
    const option = { returnOriginal: false };
    return StatisticsModel.findOneAndUpdate(filter, toUpdate, option).lean();
  }

  async deleteOne(id: string): Promise<void> {
    await StatisticsModel.deleteOne({ _id: id });
  }

  async findByDate(userId: string, monthly: string): Promise<IStat> {
    return StatisticsModel.findOne({
      $and: [{ userId }, { monthly }],
    }).lean();
  }

  async exists(filter: filterObj): Promise<Boolean> {
    return StatisticsModel.exists(filter).lean();
  }
}
