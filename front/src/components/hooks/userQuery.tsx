import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { signInPost, getCurUser } from 'api/api';
import { SignInInfo } from 'components/types/apiType';

export const useCurUser = () => {
  const queryClient = useQueryClient();
  return useQuery(
    'userState',
    async () => {
      const data = await getCurUser();
      return { userState: data.user, isLogin: !!data.user };
    },
    {
      staleTime: Infinity,
      onError: (error) => {
        queryClient.setQueryData('userState', {
          isLogin: false,
          userState: { _id: 'visitor' },
        });
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
        const JWT_TOKEN = res.user.token;
        localStorage.setItem('userToken', JWT_TOKEN);
        queryClient.invalidateQueries('userState');
        openSnackBar(true, '에러를 출력해야햇!');
        navigate('/main');
      },
      onError: () => openSnackBar(false, '에러를 출력해야햇!'),
    },
  );
};
