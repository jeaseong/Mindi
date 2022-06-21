export interface IResponse <T> {
  success: boolean;
  result: Partial<T>;
}