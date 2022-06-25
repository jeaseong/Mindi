import { useMutation, useQuery, useQueryClient } from 'react-query';
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
  return useMutation(
    async (diaryData: any) => await postDiaryPosting(diaryData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['diary', `${date.slice(0, 7)}-00`], {
          refetchInactive: true,
        });
        openSnackBar(true, '일기를 분석 중입니다.');
      },
      onError: () => {
        openSnackBar(false, '오늘의 일기를 작성해주세요.');
      },
    },
  );
};
