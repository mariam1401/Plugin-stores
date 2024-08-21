import { useCallback, useEffect, useState } from 'react';

import { debounce } from '@mui/material';

import getAllPosts from '@/lib/getAllPosts';
import { IPlugin } from '@/@types/plugin';

export interface Data {
  metadata: {
    totalCount: number;
  };
  data: IPlugin[] | null | [];
}

export const usePluginList = ({
  installationsRange,
  ratingRange,
  delay = 0,
  category,
  limit,
  query,
  page,
  php,
  wp,
}: {
  installationsRange?: [];
  category?: string;
  ratingRange?: [];
  query?: string;
  limit?: number;
  delay?: number;
  page?: number;
  php?: string;
  wp?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ metadata, data }, setData] = useState<Data>({
    metadata: { totalCount: 0 },
    data: null,
  });

  const debounced = useCallback(
    debounce(
      (
        query: undefined | string,
        category: undefined | string,
        ratingRange,
        installationsRange,
        page,
        php: undefined | string,
        wp: undefined | string,
      ) => {
        setIsLoading(true);
        getAllPosts({
          installationsRange: installationsRange,
          ratingRange: ratingRange,
          category: category,
          page: page || 1,
          query: query,
          limit: limit,
          php: php,
          wp: wp,
        })
          .then((response) => {
            setData(response);
          })
          .finally(() => {
            setIsLoading(false);
          });
      },
      delay,
    ),
    [],
  );

  useEffect(() => {
    if (
      category ||
      query ||
      ratingRange ||
      installationsRange ||
      page ||
      php ||
      wp
    ) {
      debounced(
        query,
        category,
        ratingRange,
        installationsRange,
        page,
        php,
        wp,
      );
    } else {
      setData({
        metadata: {
          totalCount: 0,
        },
        data: null,
      });
    }
  }, [query, category, ratingRange, installationsRange, page, php, wp]);

  return { isLoading, metadata, data };
};
