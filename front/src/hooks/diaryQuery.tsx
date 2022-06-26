import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getDiaryList, postDiaryPosting } from 'api/api';

export const useGetDiaryList = (year: string, month: string, day: string) => {
  const { isFetching, isLoading, error, data } = useQuery(
    ['diary', `${year}-${month}-${day}`],
    async () => await getDiaryList(year, month, day),
    {
      staleTime: Infinity,
      onError: () => {
        return '데이터가 없다.';
      },
    },
  );
  return { diary: data, isFetching, isLoading, error };
};

export const usePostDiary = (
  openSnackBar: (sucessAlert: boolean, msg: string) => void,
  date: string,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    async (diaryData: any) => await postDiaryPosting(diaryData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['diary', `${date.slice(0, 7)}-00`], {
          refetchInactive: true,
        });
        openSnackBar(true, '일기를 분석을 성공했습니다.');
        navigate('/result', {
          state: {
            date,
          },
        });
      },
      onError: () => {
        openSnackBar(false, '일기 날짜와 내용을 확인해주세요.');
      },
    },
  );
};
