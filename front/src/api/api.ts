import { AxiosFile, Axios } from 'api/costomAxios';
import {
  SignUpInfo,
  SignInInfo,
  diary,
  VerifyEmail,
  UserInfo,
} from 'types/apiType';

export const signUpPost = async (userInfo: SignUpInfo) => {
  const apiUrl = `api/auth/local/sign-up`;
  await Axios.post(apiUrl, userInfo);
};

export const signUpVerify = async (email: VerifyEmail) => {
  const apiUrl = `api/auth/local/sign-up/mail`;
  const { data } = await Axios.post(apiUrl, email);
  return data.result;
};

export const signInPost = async (userInfo: SignInInfo) => {
  const apiUrl = `api/auth/local/sign-in`;
  const { data } = await Axios.post(apiUrl, userInfo);
  return data.result;
};

export const getCurUser = async () => {
  const apiUrl = `api/users`;
  const { data } = await Axios.get(apiUrl);
  return data.result;
};

export const deleteCurUser = async () => {
  const apiUrl = `api/users`;
  await Axios.delete(apiUrl);
};

export const EditCurUser = async (userInfo: UserInfo) => {
  const apiUrl = `api/users`;
  await Axios.put(apiUrl, userInfo);
};

export const resetPassword = async (email: VerifyEmail) => {
  const apiUrl = `api/users/password-reset`;
  await Axios.post(apiUrl, email);
};

export const postDiaryPosting = async (diaryData: any) => {
  const apiUrl = `api/diaries`;
  await AxiosFile.post(apiUrl, diaryData);
};

export const putDiaryPosting = async (diaryData: any) => {
  const apiUrl = `api/diaries`;
  await AxiosFile.put(apiUrl, diaryData);
};

export const postAnalysis = async (diary: diary) => {
  const apiUrl = `diaries/sentiment`;
  const { data } = await Axios.post(apiUrl, diary);
  return data.result;
};
export const getDiaryList = async (
  year: string,
  month: string,
  day: string,
) => {
  const apiUrl = `api/diaries?year=${year}&month=${month}&day=${day}`;
  const { data } = await Axios.get(apiUrl);
  return data.result;
};

export const postStatics = async (year: string, month: string) => {
  const apiUrl = `api/statistics?year=${year}&month=${month}`;
  await Axios.post(apiUrl);
};

export const getStatics = async (year: string, month: string) => {
  const apiUrl = `api/statistics?year=${year}&month=${month}`;
  const { data } = await Axios.get(apiUrl);
  return data.result;
};

export const delStatics = async () => {
  const apiUrl = `api/statistics`;
  await Axios.delete(apiUrl);
};
