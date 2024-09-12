import { useCallback, useEffect, useState } from 'react';

import { debounce } from '@mui/material';

import getMorePluginsLikeThis from '@/lib/getMorePluginsLikeThis';
import { IMorePlugins } from '@/@types/plugin';

export interface Data {
  metadata: {
    totalCount: number;
    lastEvaluatedKey?:any
  };
  data: IMorePlugins[] | null | [];
}

export const useAlternativesList = ({
  offset,
  id,
}: {
  id?: number | string;
  offset: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ metadata, data }, setData] = useState<Data>({
    metadata: { totalCount: 0, lastEvaluatedKey: {} },
    data: null,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useCallback(
    debounce((id: number | string, offset: undefined | string) => {
      setIsLoading(true);
      getMorePluginsLikeThis({
        offset,
        id,
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
    if (id) {
      debounced(id, offset);
    } else {
      setData({
        metadata: {
          totalCount: 0,
        },
        data: null,
      });
    }
  }, [id, offset]);

  return { isLoading, metadata, data };
};
