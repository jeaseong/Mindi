export interface ISentiment {
  fear: number;
  surprised: number;
  anger: number;
  sadness: number;
  happiness: number;
  aversion: number;
}

export interface IDiary {
  readonly _id: string;
  readonly userId: string;
  diary: string;
  feeling: string;
  sentiment: ISentiment;
  diaryDate: Date;
  imageFileName?: string;
  imageFilePath?: string;
}
