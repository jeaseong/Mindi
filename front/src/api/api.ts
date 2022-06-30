import { AxiosFile, Axios } from 'api/costomAxios';
import { SignUpInfo, SignInInfo, diary } from 'types/apiType';
import axios from 'axios';

export const signUpPost = async (userInfo: SignUpInfo) => {
  const apiUrl = `api/auth/local/sign-up`;
  await Axios.post(apiUrl, userInfo);
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

<<<<<<< HEAD
export const postStatics = async (year: string, month: string) => {
  const apiUrl = `api/statistics?year=${year}&month=${month}`;
  await Axios.post(apiUrl);
};

export const getStatics = async (year: string, month: string) => {
  const apiUrl = `api/statistics?year=${year}&month=${month}`;
=======
export const postBambooPosting = async (bambooData: any) => {
  const apiUrl = `api/posts`;
  await Axios.post(apiUrl, bambooData);
};

export const getBambooList = async (pageParam: any) => {
  const apiUrl = `api/posts?page=${pageParam}&limit=6`;
>>>>>>> bamboo-front
  const { data } = await Axios.get(apiUrl);
  return data.result;
};

<<<<<<< HEAD
export const delStatics = async () => {
  const apiUrl = `api/statistics`;
  await Axios.delete(apiUrl);
};
=======
export const getBambooDetail = async (postId: any) => {
  const apiUrl = `api/posts?${postId}`;
  const { data } = await Axios.get(apiUrl);
  return data.result;
};

export const postComment = async (postId: any, content: any) => {
  const apiUrl = `api/posts/comments/${postId}`;
  await Axios.post(apiUrl, content);
};

export const getCommentList = async (postId: any) => {
  const apiUrl = `api/posts/comments/${postId}?page=1&limit=10000`;
  const { data } = await Axios.get(apiUrl);
  return data.result;
};

export const deleteComment = async (commentId: any) => {
  const apiUrl = `api/posts/comments/${commentId}`;
  await Axios.delete(apiUrl);
};

export const putComment = async (commentId: any, content: any) => {
  const apiUrl = `api/posts/comments/${commentId}`;
  await Axios.put(apiUrl, content);
};
