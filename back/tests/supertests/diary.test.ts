// "jest --detectOpenHandles --forceExit"
import request from 'supertest';
import { server } from '../../src/app';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const now = new Date();
const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
const now_KR = new Date(utc + KR_TIME_DIFF);
const today = now_KR.getFullYear() + '-' + (now_KR.getMonth() + 1) + '-' + now_KR.getDate();

const mockUserId = faker.database.mongodbObjectId();
// const mockObjectId = faker.database.mongodbObjectId();
const mockDiary = faker.lorem.paragraph();
const mockFeeling = faker.lorem.sentence();

const newDiary = {
  userId: mockUserId,
  diary: faker.lorem.paragraph(),
  feeling: faker.lorem.sentence(),
};

let toUpdate = {
  _id: 'mockObjectId',
  userId: mockUserId,
  diary: mockDiary,
  feeling: mockFeeling,
  createdDate: today,
};

const toDelete = {
  _id: 'mockObjectId',
  userId: mockUserId,
  diary: mockDiary,
  feeling: mockFeeling,
  imageFileName: 'default',
  imageFilePath: 'http://localhost:5001/images/default',
  createdDate: today,
};

const toDeleteWithImage = {
  _id: 'mockObjectId',
  userId: mockUserId,
  diary: mockDiary,
  feeling: mockFeeling,
  imageFileName: 'default',
  imageFilePath: 'http://localhost:5001/images/default',
  createdDate: today,
};

describe('Go Fit Server API TEST', () => {
  it.skip('should test that true === true', async () => {
    expect(true).toBe(true);
  });
  it('Create a new diary with an image', async () => {
    const response = await request(server)
      .post('/api/diaries')
      .type('multipart/form-data')
      .field('userId', mockUserId)
      .field('diary', mockDiary)
      .field('feeling', mockFeeling)
      .attach('background', 'tests/test.jpg');
    expect(response.status).toEqual(201);
    toDeleteWithImage._id = response.body.diary._id;
    toDeleteWithImage.imageFileName = response.body.diary.imageFileName;
    toDeleteWithImage.imageFilePath = response.body.diary.imageFilePath;
  });
  it('Create a new diary without an image', async () => {
    const response = await request(server).post('/api/diaries').send(newDiary);
    expect(response.status).toEqual(201);
    const mockObjectId = response.body.diary._id;
    toUpdate._id = mockObjectId;
    toDelete._id = mockObjectId;
  });
  it('Get a diary list', async () => {
    const response = await request(server).get(`/api/diaries?date=${today}`).send();
    expect(response.status).toEqual(200);
  });
  it('Update a diary', async () => {
    const response = await request(server).put('/api/diaries').send(toUpdate);
    expect(response.status).toEqual(200);
  });
  it('Delete a diary with default image', async () => {
    const response = await request(server).delete('/api/diaries').send(toDelete);
    expect(response.status).toEqual(204);
  });
  it('Delete a diary with an image', async () => {
    const response = await request(server).delete('/api/diaries').send(toDeleteWithImage);
    expect(response.status).toEqual(204);
  });
});

afterAll(async () => {
  await mongoose.connection.close(); // 왜 안 될까...
  await server.close();
});
