import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { signInPost, getCurUser } from 'api/api';
import { SignInInfo } from 'types/apiType';

export const useCurUser = () => {
  const queryClient = useQueryClient();
  return useQuery(
    'userState',
    async () => {
      const data = await getCurUser();
      return { userState: data, isLogin: !!data };
    },
    {
      staleTime: Infinity,
      onError: (error) => {
        console.log('에러 경우에 따라 다른 스낵바를 보여줘야겠다.', error);
      },
    },
  );
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
