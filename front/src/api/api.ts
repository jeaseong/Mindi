import { customAxios } from 'components/utils/costomAxios';
import { SignUpInfo, SignInInfo } from 'components/types/apiType';

export const signUpPost = async (userInfo: SignUpInfo) => {
  const apiUrl = `api/local/sign-up`;
  await customAxios.post(apiUrl, userInfo);
};

export const signInPost = async (userInfo: SignInInfo) => {
  const apiUrl = `api/local/sign-in`;
  const { data } = await customAxios.post(apiUrl, userInfo);
  return data;
};
