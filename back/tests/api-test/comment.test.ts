import { appStart, testEnd, apiURL } from "./appStart";
import request from "supertest";

//jest.setTimeout(10000);

let accessToken: string;
let userId: string;
let postId: string;
let commentId: string;
const regexISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

beforeAll(async () => {
  await appStart();
  await request(apiURL).post("/auth/local/sign-up").send({
    email: "test@test.com",
    name: "test",
    password: "test1234",
  });
  const mockUserInfo = await request(apiURL).post("/auth/local/sign-in").send({
    email: "test@test.com",
    password: "test1234",
  });

  accessToken = mockUserInfo.body.result.token;
  userId = mockUserInfo.body.result._id;

  const postResponse = await request(apiURL)
    .post("/posts")
    .set("Authorization", `Bearer ${accessToken}`)
    .send({
      title: "test title",
      content: "test content"
    });

  postId = postResponse.body.result._id;
});

describe("Comment Router Test", () => {
  it("should create the new depth-0 comment", async () => {
    const response = await request(apiURL)
      .post("/posts/comments/" + postId)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        content: "test content"
      });

    expect(response.status).toEqual(200);
    expect(response.body.result).toMatchObject(expect.objectContaining({
      _id: expect.any(String),
      post: postId,
      content: "test content",
      author: userId,
      depth: 0,
      createdAt: expect.stringMatching(regexISO)
    }));

    commentId = response.body.result._id;
  });

  it("should create the new depth-n comment", async () => {
    const response = await request(apiURL)
      .post("/comments/" + commentId)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        content: "test content"
      });

    expect(response.status).toEqual(200);
    expect(response.body.result).toMatchObject(expect.objectContaining({
      _id: expect.any(String),
      post: postId,
      content: "test content",
      author: userId,
      depth: expect.any(Number),
      parent: commentId,
      createdAt: expect.stringMatching(regexISO)
    }));
  });

  it("should return a comment matched with commentId", async () => {
    const response = await request(apiURL)
      .get("/comments/" + commentId)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toEqual(200);
    expect(response.body.result).toMatchObject(expect.objectContaining({
      _id: expect.any(String),
      post: expect.any(String),
      content: expect.any(String),
      author: expect.any(String),
      depth: expect.any(Number),
      parent: commentId,
      createdAt: expect.stringMatching(regexISO)
    }));
  });

  it("should return a list of comments of a comment", async () => {
    const response = await request(apiURL)
      .get("/comments/children/" + commentId)
      .set("Authorization", `Bearer ${accessToken}`)
      .query({
        page: 1,
        limit: 5
      });
    expect(response.status).toEqual(200);
    expect(response.body.result).toBeInstanceOf(Array<object>);
  });

  it("should return a list of comments of a post", async () => {
    const response = await request(apiURL)
      .get("/posts/comments/" + postId)
      .set("Authorization", `Bearer ${accessToken}`)
      .query({
        page: 1,
        limit: 5
      });
    expect(response.status).toEqual(200);
    expect(response.body.result).toBeInstanceOf(Array<object>);
  });

  it("should return a list of comments of a user", async () => {
    const response = await request(apiURL)
      .get("/users/comments/" + userId)
      .set("Authorization", `Bearer ${accessToken}`)
      .query({
        page: 1,
        limit: 5
      });
    expect(response.status).toEqual(200);
    expect(response.body.result).toBeInstanceOf(Array<object>);
  });

  it("should update a comment", async () => {
    const response = await request(apiURL)
      .put("/comments/" + commentId)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        content: "test content"
      });

    expect(response.status).toEqual(200);
    expect(response.body.result).toMatchObject(expect.objectContaining({
      _id: expect.any(String),
      post: expect.any(String),
      content: "test content",
      author: expect.any(String),
      depth: expect.any(Number),
      createdAt: expect.stringMatching(regexISO)
    }));
  });

  it("should delete a comment", async () => {
    const response = await request(apiURL)
      .delete("/comments/" + commentId)
      .set("Authorization", `Bearer ${accessToken}`)

    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  await testEnd();
});
