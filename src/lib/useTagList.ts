import { useCallback, useEffect, useState } from 'react';

import { debounce } from '@mui/material';

import { IPlugin } from '@/@types/plugin';
import getTags from '@/lib/getTags';

export interface Data {
  metadata: {
    totalCount: number;
  };
  data: IPlugin[] | null | [];
}

export const useTagList = ({ query }: { query?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ metadata, data }, setData] = useState<Data>({
    metadata: { totalCount: 0 },
    data: null,
  });
  const debounced = useCallback(
    debounce((query: undefined | string) => {
      setIsLoading(true);
      getTags({
        query: query,
        page: 1,
      })
        .then((response) => {
          if (response) {
            setData(response);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 300),
    [],
  );

  useEffect(() => {
    if (query) {
      debounced(query);
    } else {
      setData({
        metadata: {
          totalCount: 0,
        },
        data: null,
      });
    }
  }, [query]);

  return { isLoading, metadata, data };
};
