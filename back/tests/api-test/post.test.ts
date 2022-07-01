import { appStart, testEnd, apiURL } from "./appStart";
import request from "supertest";

//jest.setTimeout(10000);

let accessToken: string;
let userId: string;
let postId: string;
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
  postId = "1234161234231";
});

describe("Post Router Test", () => {
  it("should create the new post", async () => {
    const response = await request(apiURL)
      .post("/posts")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "test title",
        content: "test content"
      });

    expect(response.status).toEqual(200);
    expect(response.body.result).toMatchObject(expect.objectContaining({
      _id: expect.any(String),
      title: "test title",
      content: "test content",
      author: userId,
      comments: 0,
      createdAt: expect.stringMatching(regexISO)
    }));
  });

  it("should return a list of posts", async () => {
    const response = await request(apiURL)
      .get("/posts")
      .set("Authorization", `Bearer ${accessToken}`)
      .query({
        page: 1,
        limit: 5
      });
    expect(response.status).toEqual(200);
    expect(response.body.result).toBeInstanceOf(Array<object>);
  });

  // it("should return a single post matched with postId", async () => {
  //   const response = await request(apiURL)
  //     .get("/posts/" + postId)
  //     .set("Authorization", `Bearer ${accessToken}`);
  //
  //   expect(response.status).toEqual(200);
  //   expect(response.body.result).toMatchObject(expect.objectContaining({
  //     _id: expect.any(String),
  //     title: "test title",
  //     content: "test content",
  //     author: userId,
  //     comments: expect.any(Number),
  //     createdAt: expect.stringMatching(regexISO)
  //   }));
  // });
  //

  it("should return a list of posts of a user", async () => {
    const response = await request(apiURL)
      .get("/users/posts")
      .set("Authorization", `Bearer ${accessToken}`)
      .query({
        page: 1,
        limit: 5
      });
    expect(response.status).toEqual(200);
    expect(response.body.result).toBeInstanceOf(Array<object>);
  });
});

// it("should update a post", async () => {
//   const response = await request(apiURL)
//     .put("/posts/" + postId)
//     .set("Authorization", `Bearer ${accessToken}`)
//
//   expect(response.status).toEqual(200);
//   expect(response.body.result).toMatchObject(expect.objectContaining({
//     _id: expect.any(String),
//     title: "test title",
//     content: "test content",
//     author: userId,
//     comments: 0,
//     createdAt: expect.stringMatching(regexISO)
//   }));
// });

afterAll(async () => {
  await testEnd();
});
