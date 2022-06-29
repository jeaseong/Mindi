import { ISentiment } from "./IDiary";

export interface IStat {
  readonly _id: string;
  readonly userId: string;
  monthly: string;
  keywords: Array<string>;
  emotions: ISentiment;
  reminder: Array<object>;
}
