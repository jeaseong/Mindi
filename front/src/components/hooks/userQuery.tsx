import { useMutation, useQuery, useQueryClient } from 'react-query';
import { signInPost, getCurUser } from 'api/api';
import { SignInInfo } from 'components/types/apiType';

export const useCurUser = () => {
  const queryClient = useQueryClient();

  return useQuery(
    'userState',
    async () => {
      const data = await getCurUser();
      return { usertState: data.user, isLogin: data.user };
    },
    {
      staleTime: Infinity,
      onError: (error) => {
        console.log('에러 경우에 따라 다른 스낵바를 보여줘야겠다.', error);
      },
    },
  );
};

export const useSignInHandler = (openSnackBar: (msg: string) => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (loginData: SignInInfo) => await signInPost(loginData),
    {
      onSuccess: (res) => {
        const JWT_TOKEN = res.user.token;
        localStorage.setItem('userToken', JWT_TOKEN);
        queryClient.invalidateQueries('userState');
      },
      onError: () => openSnackBar('에러를 출력해야햇!'),
    },
  );
};
