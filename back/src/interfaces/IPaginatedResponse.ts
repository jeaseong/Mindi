export interface IPaginatedResponse <T> {
  success: boolean;
  result: Partial<T> & {
    cursor: string;
    totalNumber: Number;
  };
}