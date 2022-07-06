import { IResponse } from "./IResponse";

export interface IPaginatedResponse<T> extends IResponse<T>{
  success: boolean;
  result: Partial<T>
  cursor: string;
  totalNumber: Number;
}