export interface BaseDiary {
  readonly userId: string;
  diary: string;
  feeling: string;
  sentiment: object;
  readonly createdDate: string; // "2022-6-10"
  imageFileName?: string;
  imageFilePath?: string;
}

export interface IDiary extends BaseDiary {
  readonly _id: string;
}
