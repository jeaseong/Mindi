export interface BaseDiary {
  readonly userId: string;
  diary: string;
  feeling: string;
  imageFileName?: string;
  imageFilePath?: string;
  readonly createdDate: string; // "2022-6-10"
}

export interface IDiary extends BaseDiary {
  readonly _id: string;
}

export interface deleteResult {
  status: string; // "Succeess" or "Fail"
}
