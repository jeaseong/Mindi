import { useQuery } from 'react-query';
import { getDiaryList } from 'api/api';

export const useGetDiaryList = (year: string, month: string, day: string) => {
  const { isFetching, error, data } = useQuery(
    ['diary', `${year}-${month}-${day}`],
    async () => await getDiaryList(year, month, day),
    {
      staleTime: Infinity,
    },
  );
  return { diary: data, isFetching, error };
};
