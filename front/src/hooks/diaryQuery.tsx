import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getDiaryList, postDiaryPosting, putDiaryPosting } from 'api/api';
export const useGetDiaryList = (date: string, type: string) => {
  const dateSplit = date.split('-');
  const { isFetching, isLoading, error, data } = useQuery(
    ['diary', date],
    async () =>
      await getDiaryList(dateSplit[0], dateSplit[1], dateSplit[2], type),
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
        queryClient.invalidateQueries(['diary', date], {
          refetchInactive: true,
        });
        openSnackBar(true, '일기를 분석을 성공했습니다.');
        navigate(`/result/${date}}`, {
          state: {
            date,
          },
        });
      },
      onError: (e) => {
        openSnackBar(false, '일기를 50자 이상 작성해 주세요.');
      },
    },
  );
};
export const useEditDiary = (
  openSnackBar: (sucessAlert: boolean, msg: string) => void,
  date: string,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    async (diaryData: any) => await putDiaryPosting(diaryData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['diary', `${date.slice(0, 7)}-00`], {
          refetchInactive: true,
        });
        queryClient.invalidateQueries(['diary', date], {
          refetchInactive: true,
        });
        openSnackBar(true, '일기를 수정했습니다. 새로 일기를 분석했습니다.');
        navigate(`/result/${date}`, {
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
