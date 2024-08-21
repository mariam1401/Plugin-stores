import { useCallback, useEffect, useState } from 'react';

import { debounce } from '@mui/material';

import getReviews from '@/lib/getReviews';
import { IReview } from '@/@types/plugin';

export interface Data {
  metadata: {
    totalCount: number;
  };
  data: IReview[] | null | [];
}

export const useReviewsList = ({
  offset,
  stars,
  slug,
}: {
  stars: number[];
  offset: number;
  slug?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ metadata, data }, setData] = useState<Data>({
    metadata: { totalCount: 0 },
    data: null,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useCallback(
    debounce((slug: string, offset: number, stars: number[]) => {
      setIsLoading(true);
      getReviews({
        limit: 10,
        offset,
        stars,
        slug,
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
    if (slug) {
      debounced(slug, offset, stars);
    } else {
      setData({
        metadata: {
          totalCount: 0,
        },
        data: null,
      });
    }
  }, [slug, offset, stars]);

  return { isLoading, metadata, data };
};
