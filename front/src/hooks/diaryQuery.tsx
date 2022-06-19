import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getDiaryList, postDiaryPosting } from 'api/api';

export const useGetDiaryList = async (id: string) => {
  return useQuery('diaryList', async () => {
    const data = await getDiaryList(id);
    return { diaryList: data.result };
  });
};

export const usePostDiary = async () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    async (diaryData: any) => await postDiaryPosting(diaryData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('diaryList');
        navigate(`/result/diaryId`);
      },
    },
  );
};
