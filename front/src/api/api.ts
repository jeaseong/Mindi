import {
  customAxios,
  customAxiosFileUpload,
  customAxiosForAi,
} from 'api/costomAxios';
import { SignUpInfo, SignInInfo, diary } from 'types/apiType';

export const signUpPost = async (userInfo: SignUpInfo) => {
  const apiUrl = `api/auth/local/sign-up`;
  await customAxios.post(apiUrl, userInfo);
};

export const signInPost = async (userInfo: SignInInfo) => {
  const apiUrl = `api/auth/local/sign-in`;
  const { data } = await customAxios.post(apiUrl, userInfo);
  return data.result;
};

export const getCurUser = async () => {
  const apiUrl = `api/users`;
  const { data } = await customAxios.get(apiUrl);
  return data.result;
};

export const getDiaryList = async (
  year: number,
  month: number,
  day: number,
) => {
  const apiUrl = `/diaries?year=${year}&month=${month}&day=${day}`;
  const { data } = await customAxios.get(apiUrl);
  return data.result;
};

export const postAnalysis = async (diary: diary) => {
  const apiUrl = `diaries/sentiment`;
  const { data } = await customAxiosForAi.post(apiUrl, diary);
  return data.result;
};
export const postDiaryPosting = async (diaryData: any) => {
  const apiUrl = `api/diaries`;
  await customAxiosFileUpload.post(apiUrl, diaryData);
};

export const postBambooPosting = async (bambooData: any) => {
  const apiUrl = `api/posts`;
  await customAxios.post(apiUrl, bambooData);
};

export const getBambooList = async () => {
  const apiUrl = `api/users/posts`;
  const { data } = await customAxios.get(apiUrl);
  return data.result;
};

export const postBambooCommentPosting = async (bambooData: any) => {
  const apiUrl = `api/posts/comments`;
  await customAxios.post(apiUrl, bambooData);
};
