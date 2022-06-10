import mongoose from 'mongoose';
import { Diary } from '../interfaces/IDiary';

const DiarySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    diary: {
      type: String,
      required: true,
    },
    feeling: {
      type: String,
      required: true,
    },
    createdDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const DiaryModel = mongoose.model<Diary>('Diary', DiarySchema);
