import { PostService } from "../../src/services";
import logger from "../../src/loaders/winston";
import {
  testPostModel,
  mockReqBody,
  mockPost,
  mockObjectId,
  mockUserObjectId,
  fieldToUpdate,
} from "./mock/post";
import { testCommentModel } from "./mock/comment";

describe("Post Service Test", () => {
  const postService = new PostService(testPostModel, testCommentModel, logger);
  test("should return new post.", async () => {
    expect(await postService.makeNewPost(mockReqBody)).toEqual(mockPost);
  });
  test("should return post list.", async () => {
    expect(await postService.getPostsWithFilter({ author: mockUserObjectId }, 1, 5)).toEqual([
      mockPost,
      mockPost,
    ]);
  });
  test("should return post list.", async () => {
    expect(await postService.getPostsWithFilter(null, 1, 5)).toEqual([mockPost, mockPost]);
  });
  test("should return a post.", async () => {
    expect(await postService.getOnePostByPostId(mockObjectId)).toEqual(mockPost);
  });
  test("should return updated post.", async () => {
    expect(await postService.updatePostInfo(mockObjectId, fieldToUpdate)).toEqual(mockPost);
  });
});
