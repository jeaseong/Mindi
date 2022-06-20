import { useQuery } from 'react-query';
import { getDiaryList } from 'api/api';

export const useGetDiaryList = async (type: string, id: string) => {
  return useQuery('diaryList', async () => {
    const data = await getDiaryList(id);
    return { diaryList: data.result };
  });
};
