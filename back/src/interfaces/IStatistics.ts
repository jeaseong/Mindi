export interface IStat {
  readonly _id: string;
  readonly userId: string;
  monthly: string;
  keywords: Array<string>;
  emotions: object;
  // diaries: Array<object>;
}
