import {
  customAxios,
  customAxiosGet,
  customAxiosFileUpload,
} from 'api/costomAxios';
import { SignUpInfo, SignInInfo, DiaryInfo } from 'components/types/apiType';

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
  const { data } = await customAxiosGet.get(apiUrl);
  return data;
};

export const postDiaryPosting = async (diaryData: any) => {
  const apiUrl = `api/diaries`;
  await customAxiosFileUpload.post(apiUrl, diaryData);
};
