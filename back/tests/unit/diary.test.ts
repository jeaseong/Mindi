import { DiaryService } from "../../src/services";
import { mockUserId, mockObjectId, mockDiary, testDiaryModel } from "./mock/diary";
import logger from "../../src/loaders/winston";

describe("Diary Service Test", () => {
  const date = "2022-06-25";
  const diaryService = new DiaryService(testDiaryModel, logger);

  it("create new diary", async () => {
    expect(await diaryService.create(mockDiary)).toEqual({
      _id: mockObjectId,
      ...mockDiary,
    });
  });

  it("delete a diary", async () => {
    expect(await diaryService.deleteOne(mockObjectId)).toEqual(void {});
  });

  it("find a diary list", async () => {
    expect(await diaryService.findByDate(mockUserId, date)).toEqual([
      {
        _id: mockObjectId,
        ...mockDiary,
      },
    ]);
  });
});
