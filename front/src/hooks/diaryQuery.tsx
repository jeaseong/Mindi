import { useQuery } from 'react-query';
import { getDiaryList } from 'api/api';

export const useGetDiaryList = async (date: string) => {
  return useQuery(['diaryList', date], async () => {
    const data = await getDiaryList(0, 0, 0);
    return data;
  });
};
