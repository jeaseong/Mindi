export interface BaseStat {
  readonly userId: string;
  monthly: string;
  keywords: Array<string>;
  emotions: object;
  // diaries: Array<object>;
}

export interface IStat extends BaseStat {
  readonly _id: string;
}
