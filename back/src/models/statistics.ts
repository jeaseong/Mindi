import { Schema, model } from "mongoose";
import { Service } from "typedi";
import { IStat, IStatModel } from "../interfaces";

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
      type: Array,
      required: true,
    },
    emotions: {
      type: Object,
      required: true,
    },
    // diaries: {
    //   type: Array,
    //   required: true,
    // },
  },
  { timestamps: true },
);

const StatisticsModel = model<IStat>("Statistics", StatisticsSchema);

@Service()
export class MongoStatModel implements IStatModel {
  async create(newDiary: Partial<IStat>): Promise<IStat> {
    const newDoc = await StatisticsModel.create(newDiary);
    return newDoc.toObject();
  }

  async updateOne(filter: Partial<IStat>, toUpdate: Partial<IStat>): Promise<IStat> {
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

  async exists(filter: Partial<IStat>): Promise<Boolean> {
    return StatisticsModel.exists(filter).lean();
  }
}
