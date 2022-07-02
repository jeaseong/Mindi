import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { signInPost, getCurUser } from 'api/api';
import { SignInInfo } from 'types/apiType';

export const useCurUser = () => {
  const { isFetching, data, error, isLoading } = useQuery(
    'userState',
    async () => await getCurUser(),
    {
      staleTime: Infinity,
      retry: false,
      onError: (error) => {
        console.log('유저 정보가 없습니다.', error);
      },
    },
  );
  return { userState: data, isLogin: !!data, isFetching, error, isLoading };
};

export const useSignInHandler = (
  openSnackBar: (sucessAlert: boolean, msg: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    async (loginData: SignInInfo) => await signInPost(loginData),
    {
      onSuccess: (res) => {
        const JWT_TOKEN = res.token;
        sessionStorage.setItem('userToken', JWT_TOKEN);
        queryClient.invalidateQueries('userState');
        openSnackBar(true, '로그인 성공!');
        navigate('/');
      },
      onError: () =>
        openSnackBar(false, '아이디, 비밀번호가 일치하지 않습니다.'),
    },
  );
};
