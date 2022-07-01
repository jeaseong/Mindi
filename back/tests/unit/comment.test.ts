import { CommentService } from "../../src/services";
import logger from "../../src/loaders/winston";
import {
  testCommentModel,
  mockReqBody,
  mockComment,
  mockObjectId,
  fieldToUpdate,
  mockParentObjectId,
  mockPostObjectId,
  mockUserObjectId,
} from "./mock/comment";

describe("Comment Service Test", () => {
  const commentService = new CommentService(testCommentModel, logger);
  test("should return new comment.", async () => {
    expect(await commentService.makeNewComment(mockReqBody)).toEqual(mockComment);
  });
  test("should return comment list.", async () => {
    expect(
      await commentService.getCommentsWithFilter({ parent: mockParentObjectId }, 1, 5),
    ).toEqual([mockComment, mockComment]);
  });
  test("should return comment list.", async () => {
    expect(
      await commentService.getCommentsWithFilter({ post: mockPostObjectId, depth: 0 }, 1, 5),
    ).toEqual([mockComment, mockComment]);
  });
  test("should return comment list.", async () => {
    expect(await commentService.getCommentsWithFilter({ author: mockUserObjectId }, 1, 5)).toEqual([
      mockComment,
      mockComment,
    ]);
  });
  test("should return a comment.", async () => {
    expect(await commentService.getOneCommentByCommentId(mockObjectId)).toEqual(mockComment);
  });
  test("should return updated comment.", async () => {
    expect(await commentService.updateCommentInfo(mockObjectId, fieldToUpdate)).toEqual(
      mockComment,
    );
  });
  test("should return undefined.", async () => {
    expect(await commentService.deleteComment(mockObjectId)).toBe(undefined);
  });
});
