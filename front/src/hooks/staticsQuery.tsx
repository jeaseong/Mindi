import { useQuery, useQueryClient, useMutation } from 'react-query';
import { postStatics, updateStatics, getStatics } from 'api/api';

export const useGetStatics = (date: string) => {
  const dateSplit = date.split('-');
  const { isFetching, isLoading, error, data } = useQuery(
    ['statics', date],
    async () => await getStatics(dateSplit[0], dateSplit[1]),
    {
      staleTime: Infinity,
      retry: false,
      onError: () => {
        return null;
      },
    },
  );
  return { statics: data, isFetching, isLoading, error };
};
