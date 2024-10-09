'use client';

import { useEffect, useState } from 'react';

import { PaginationItem, useMediaQuery, Pagination } from '@mui/material';

import { Separator } from '@/app/wordpress-plugin/[slug]/components/Separator/Separator';
import { Loader } from '@/app/wordpress-plugin/[slug]/components/Loader/Loader';
import { AddOn } from '@/app/wordpress-plugin/[slug]/components/AddOn/AddOn';

import getAllPosts from '@/lib/getAllPosts';
import { IPlugin } from '@/@types/plugin';

import styles from '../index.module.scss';

interface PluginData {
  metadata: { totalCount: number };
  data: IPlugin[];
}
export const PluginsList = ({
  data,
  slug,
}: {
  data: PluginData;
  slug: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [page, setPage] = useState(1);
  const [plugins, setPlugins] = useState<PluginData | null>(null);
  const smallScreen = useMediaQuery('(max-width:768px)');

  const pagesCount = Math.ceil(
    //@ts-ignore
    plugins?.metadata?.totalCount / 9,
  );
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPagination(true);
    setPage(value);
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  useEffect(() => {
    if (data) {
      //@ts-ignore
      setPlugins(data);
    }
    setInitialRender(true);
  }, [data]);

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await getAllPosts({
        query: slug,
        //@ts-ignore
        page: page,
        limit: 9,
      });
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    if (initialRender && pagination) {
      setTimeout(() => {
        fetchData()
          .then((data) => {
            setPlugins(data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error('Error fetching data:', error);
          });
      }, 300);
    }
  }, [initialRender, page]);

  return (
    <>
      <Separator />
      <div className={styles.ctn}>
        <p className={styles.result}>
          All results ({plugins?.metadata?.totalCount})
        </p>
        {isLoading ? (
          <div className={styles.loader_ctn}>
            <Loader />
          </div>
        ) : (
          <div className={styles.plugins}>
            {plugins?.data &&
              plugins?.data?.length > 0 &&
              plugins?.data?.map((el: IPlugin) => {
                return (
                  <AddOn
                    active_installations={el?.active_installations}
                    category_name={el?.category?.category}
                    downloads={el?.active_installations}
                    withActiveInstallations={true}
                    shortTitle={el?.short_title}
                    className={styles.plugin}
                    slug={el?.plugin_slug}
                    name={el?.plugin_name}
                    isBlackTheme={false}
                    rating={el?.rating!}
                    key={el?.plugin_id}
                    image={el?.logo ? el?.logo : 'https://plugin-store-assets.s3.amazonaws.com/icon.png'}
                  />
                );
              })}
          </div>
        )}
      </div>
      <div className={styles.pagination}>
        {initialRender && pagesCount > 1 && (
          <Pagination
            renderItem={(item) => (
              <PaginationItem
                classes={{
                  colorPrimary: styles.selectedPage,
                  selected: styles.selectedPage,
                }}
                {...item}
              />
            )}
            sx={{
              '& .MuiPaginationItem-previousNext': {
                border: '1px solid #cfcfcf',
              },
            }}
            size={smallScreen ? 'small' : 'medium'}
            onChange={handlePageChange}
            count={pagesCount}
            page={page}
          />
        )}
      </div>
    </>
  );
};
