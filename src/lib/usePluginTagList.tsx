import { useCallback, useEffect, useState, useRef } from 'react';

//@ts-ignore
import debounce from 'lodash/debounce';

import getPluginsTags from '@/lib/getPluginsTags';
import { IPlugin } from '@/@types/plugin';

export interface Data {
  plugins: {
    data: IPlugin[] | null | [];
    count: number;
  };
  tag: {
    data: IPlugin[] | null | [];
    count: number;
  };
}

export const usePluginTagList = ({ query }: { query?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ plugins, tag }, setData] = useState<Data>({
    plugins: { data: null, count: 0 },
    tag: { data: null, count: 0 },
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const performSearch = useCallback((query: string) => {
    setIsLoading(true);
    getPluginsTags({ search: query })
      .then((response) => {
        if (isMountedRef.current) {
          if (response) {
            setData(response);
          }
        }
      })
      .catch((error) => {
        if (isMountedRef.current) {
          console.error('Failed to fetch plugin tags:', error);
        }
      })
      .finally(() => {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      });
  }, []);

  const debouncedSearch = useRef(
    debounce((query: string) => {
      performSearch(query);
    }, 300),
  ).current;

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setData({
        plugins: { data: null, count: 0 },
        tag: { data: null, count: 0 },
      });
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return { isLoading, plugins, tag };
};
