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
  type: string,
) => {
  let apiUrl;
  if (type === 'year') apiUrl = `api/diaries?year=${year}`;
  else if (type === 'month') apiUrl = `api/diaries?year=${year}&month=${month}`;
  else apiUrl = `api/diaries?year=${year}&month=${month}&day=${day}`;

  const { data } = await Axios.get(apiUrl);
  return data.result;
};

export const postStatics = async (year: string, month: string) => {
  const apiUrl = `api/statistics?year=${year}&month=${month}`;
  await Axios.post(apiUrl);
};

export const updateStatics = async (year: string, month: string) => {
  const apiUrl = `api/statistics?year=${year}&month=${month}`;
  await Axios.put(apiUrl);
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

export const postBambooPosting = async (bambooData: any) => {
  const apiUrl = `api/posts`;
  await Axios.post(apiUrl, bambooData);
};

export const getBambooList = async (pageParam: number) => {
  const apiUrl = `api/posts?page=${pageParam}&limit=6`;
  const { data } = await Axios.get(apiUrl);
  return data.result;
};

export const getBambooDetail = async (postId: string) => {
  const apiUrl = `api/posts?${postId}`;
  const { data } = await Axios.get(apiUrl);
  return data.result;
};

export const postComment = async (postId: string, content: any) => {
  const apiUrl = `api/posts/comments/${postId}`;
  await Axios.post(apiUrl, content);
};

export const getCommentList = async (postId: string) => {
  const apiUrl = `api/posts/comments/${postId}?page=1&limit=10000`;
  const { data } = await Axios.get(apiUrl);
  return data.result;
};

export const deleteComment = async (commentId: string) => {
  const apiUrl = `api/posts/comments/${commentId}`;
  await Axios.delete(apiUrl);
};

export const putComment = async (commentId: string, content: any) => {
  const apiUrl = `api/posts/comments/${commentId}`;
  await Axios.put(apiUrl, content);
};
