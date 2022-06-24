import { customAxiosFileUpload, Axios } from 'api/costomAxios';
import { SignUpInfo, SignInInfo, diary } from 'types/apiType';

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
  await customAxiosFileUpload.post(apiUrl, diaryData);
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
