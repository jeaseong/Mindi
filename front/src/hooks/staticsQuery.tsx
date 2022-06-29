import { useQuery, useQueryClient } from 'react-query';
import { postStatics, getStatics, delStatics } from 'api/api';

export const useGetStatics = (date: string) => {
  const dateSplit = date.split('-');
  const { isFetching, isLoading, error, data } = useQuery(
    ['statics', date],
    async () => {
      try {
        await postStatics(dateSplit[0], dateSplit[1]);
        const data = await getStatics(dateSplit[0], dateSplit[1]);
        return data;
      } catch (e) {
        const data = await getStatics(dateSplit[0], dateSplit[1]);
        return data;
      }
    },

    {
      staleTime: Infinity,
      retry: false,
      onError: () => {
        console.log('어떤 경우에 통계를 가지고 올 수 없는지.');
      },
    },
  );
  return { statics: data, isFetching, isLoading, error };
};
