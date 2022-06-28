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
      type: Date,
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
    reminder: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

const StatisticsModel = model<IStat>("Statistics", StatisticsSchema);

@Service()
export class MongoStatModel implements IStatModel {
  async create(newResult: Partial<IStat>): Promise<IStat> {
    const newDoc = await StatisticsModel.create(newResult);
    return newDoc.toObject();
  }

  async deleteOne(id: string): Promise<void> {
    await StatisticsModel.deleteOne({ _id: id });
  }

  async findByDate(userId: string, monthly: string): Promise<IStat> {
    return StatisticsModel.findOne({
      $and: [{ userId }, { monthly }],
    }).lean();
  }

  async exists(userId: string, filter: Partial<IStat>): Promise<Boolean> {
    return StatisticsModel.exists({ $and: [{ userId }, filter] }).lean();
  }
}
