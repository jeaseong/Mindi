import { StatService } from "../../src/services";
import { testDiaryModel } from "./mock/diary";
import {
  mockUserId,
  mockObjectId,
  mockList,
  mockStat,
  mockResult,
  testStatisticsModel,
} from "./mock/statistics";
import logger from "../../src/loaders/winston";

describe("Statistics Service Test", () => {
  const date = "2022-05";
  const statService = new StatService(testStatisticsModel, testDiaryModel, logger);

  it("create new result", async () => {
    expect(await statService.create(mockStat, date, mockList)).toEqual({
      _id: mockObjectId,
      ...mockResult,
    });
  });

  it("delete a result", async () => {
    expect(await statService.deleteOne(mockObjectId)).toEqual(void {});
  });

  it("find a result", async () => {
    expect(await statService.findByDate(mockUserId, date)).toEqual({
      _id: mockObjectId,
      ...mockResult,
    });
  });
});
