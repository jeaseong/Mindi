// "jest --detectOpenHandles --forceExit"
import request from 'supertest';
import appStart from '../../src/app';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import config from '../../src/config';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const today = dayjs().locale('ko').format('YYYY-MM-DD');
const mockUserId = faker.database.mongodbObjectId();
const mockDiary = faker.lorem.paragraph();
const mockFeeling = faker.lorem.sentence();
const tempUserId = '62a76c45f0ed80e0f9e765fc';

const newDiary = {
  userId: tempUserId,
  diary: faker.lorem.paragraph(),
  feeling: faker.lorem.sentence(),
};

let toUpdate = {
  _id: 'mockObjectId',
  userId: tempUserId,
  diary: mockDiary,
  feeling: mockFeeling,
  createdDate: today,
};

const toDelete = {
  _id: 'mockObjectId',
  userId: mockUserId,
  diary: mockDiary,
  feeling: mockFeeling,
  createdDate: today,
};

const toDeleteWithImage = {
  _id: 'mockObjectId',
  userId: mockUserId,
  diary: mockDiary,
  feeling: mockFeeling,
  imageFileName: 'default',
  imageFilePath: `http://localhost:${config.port}/images/default`,
  createdDate: today,
};

beforeAll(async () => {
  await appStart;
});

const server = `http://localhost:${config.port}`;

describe('Diary with no image', () => {
  it('Create a new diary without image', async () => {
    const response = await request(server).post('/api/diaries').send(newDiary);
    expect(response.status).toEqual(201);
    let mockObjectId = response.body.diary._id;
    toUpdate._id = mockObjectId;
    toDelete._id = mockObjectId;
  });

  it('Update a diary without image', async () => {
    const response = await request(server).put('/api/diaries').send(toUpdate);
    expect(response.status).toEqual(200);
  });

  it('Get a diary list', async () => {
    const response = await request(server).get(`/api/diaries?userId=${tempUserId}&date=${today}`);
    expect(response.status).toEqual(200);
  });

  it('Get a diary', async () => {
    const response = await request(server).get(`/api/diaries/${toUpdate._id}`);
    expect(response.status).toEqual(200);
  });

  it('Delete a diary without image', async () => {
    const response = await request(server).delete('/api/diaries').send(toDelete);
    expect(response.status).toEqual(204);
  });
});

describe('Diary with an image', () => {
  it('Create a new diary with an image', async () => {
    const response = await request(server)
      .post('/api/diaries')
      .type('multipart/form-data')
      .field('userId', tempUserId)
      .field('diary', mockDiary)
      .field('feeling', mockFeeling)
      .attach('background', 'tests/test.jpg');
    expect(response.status).toEqual(201);
    toDeleteWithImage._id = response.body.diary._id;
    toDeleteWithImage.imageFileName = response.body.diary.imageFileName;
  });

  it('Update a diary with an image', async () => {
    const response = await request(server)
      .put('/api/diaries')
      .type('multipart/form-data')
      .field('_id', toDeleteWithImage._id)
      .field('userId', tempUserId)
      .field('diary', mockDiary)
      .field('feeling', faker.lorem.sentence())
      .field('imageFileName', toDeleteWithImage.imageFileName)
      .field('createdDate', today)
      .attach('background', 'tests/test2.jpg');
    expect(response.status).toEqual(200);
    toDeleteWithImage.imageFileName = response.body.diary.imageFileName;
    toDeleteWithImage.imageFilePath = response.body.diary.imageFilePath;
  });

  it('Delete a diary with an image', async () => {
    const response = await request(server).delete('/api/diaries').send(toDeleteWithImage);
    expect(response.status).toEqual(204);
  });
});

afterAll(async () => {
  await mongoose.connection.close().then(() => {
    console.log('mongodb is disconnected');
  }); // 왜 안 될까...
});
