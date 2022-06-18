import {
  customAxios,
  customAxiosFileUpload,
  customAxiosForAi,
} from 'api/costomAxios';
import { SignUpInfo, SignInInfo } from 'types/apiType';

export const signUpPost = async (userInfo: SignUpInfo) => {
  const apiUrl = `api/auth/local/sign-up`;
  await customAxios.post(apiUrl, userInfo);
};

export const signInPost = async (userInfo: SignInInfo) => {
  const apiUrl = `api/auth/local/sign-in`;
  const { data } = await customAxios.post(apiUrl, userInfo);
  return data;
};

export const getCurUser = async () => {
  const apiUrl = `api/users`;
  const { data } = await customAxios.get(apiUrl);
  return data;
};

export const postDiaryPosting = async (diaryData: any) => {
  const apiUrl = `api/diaries`;
  await customAxiosFileUpload.post(apiUrl, diaryData);
};

export const postAnalysis = async (diary: string) => {
  const apiUrl = `diaries/sentiment`;
  const { data } = await customAxiosForAi.post(apiUrl, diary);
  return data.sentiment;
};
