import { customAxios } from 'components/utils/costomAxios';
import { SignInInfo } from 'components/types/apiType';

export const signUpPost = async (userInfo: SignInInfo) => {
  const apiUrl = `api/local/sign-up`;
  const { data } = await customAxios.post(apiUrl, userInfo);
};
