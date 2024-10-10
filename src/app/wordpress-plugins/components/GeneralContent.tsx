'use client';
import { useEffect, useState } from 'react';

import { PaginationItem, useMediaQuery, Pagination } from '@mui/material';
import { HiFilter } from 'react-icons/hi';
import Link from 'next/link';

import { Separator } from '@/app/wordpress-plugin/[slug]/components/Separator/Separator';
import Experience from '@/app/wordpress-plugins/components/Experience/Experience';
import { Pluginlist } from '@/app/wordpress-plugins/components/Plugins';
import { Filter } from '@/app/wordpress-plugins/components/Filter';

import styles from '@/app/wordpress-plugins/page.module.scss';
import { ALTERNATIVES_PAGE_PER_LIMIT } from '@/lib/consts';
import getAllPosts from '@/lib/getAllPosts';

import ChevronRight from '../rightIcon.svg';

export const GeneralContent = ({
  categories,
  category,
  data,
  tag,
}: {
  category?: {
    category?: string;
    slug?: string;
  };
  tag?: { tag: string }[];
  categories: [];
  data?: any;
}) => {
  //@ts-ignore
  const [plugins, setPlugins] = useState<{
    metadata: { totalCount: number };
    data: [];
  }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [initialRender, setInitialRender] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const middleScreen = useMediaQuery('(max-width:1260px)');
  const [filter, setFilter] = useState<{
    installationsRange: number[];
    ratingRange: number[];
    category_id?: string;
    php?: string;
    wp?: string;
    tags: [];
  }>({
    installationsRange: [0, 10000000],
    ratingRange: [0, 5],
    tags: [],
  });
  const pagesCount = Math.ceil(
    //@ts-ignore
    plugins?.metadata?.totalCount / ALTERNATIVES_PAGE_PER_LIMIT,
  );
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setIsFilter(true);
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };
  useEffect(() => {
    if (data) {
      setPlugins(data);
    }
    setIsLoading(false);
    setInitialRender(true);
  }, []);
  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await getAllPosts({
        //@ts-ignore
        installationsRange:
          filter?.installationsRange?.length > 0
            ? [
                //@ts-ignore
                filter?.installationsRange[0]
                  ? //@ts-ignore
                    filter?.installationsRange[0]
                  : 0,
                //@ts-ignore
                filter?.installationsRange[1]
                  ? //@ts-ignore
                    filter?.installationsRange[1]
                  : 0,
              ]
            : '',
        //@ts-ignore
        ratingRange:
          //@ts-ignore
          filter?.ratingRange?.length > 0
            ? [
                //@ts-ignore
                filter?.ratingRange[0] ? filter?.ratingRange[0] : 0,
                //@ts-ignore
                filter?.ratingRange[1] ? filter?.ratingRange[1] : 0,
              ]
            : '',
        //@ts-ignore
        tag:
          filter?.tags?.length > 0
            ? filter?.tags?.map((el: { slug: string }) => el?.slug)
            : '',
        category: filter?.category_id,
        php: filter?.php,
        wp: filter?.wp,
        page: page,
        limit: 10,
      });
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }
  const handleFilterModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (initialRender && isFilter) {
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
  }, [initialRender, filter, page]);

  return (
    <main className={styles.container}>
      {open && (
        <div className={styles.menu}>
          <Filter
            closeModal={handleFilterModal}
            setIsFilter={setIsFilter}
            categories={categories}
            setData={setFilter}
            isFilter={isFilter}
            plugins={plugins}
            //@ts-ignore
            data={filter}
            //@ts-ignore
            tag={tag}
          />
        </div>
      )}
      <div className={styles.breadcrumb}>
        <Link href={`/wordpress-plugins/`} scroll>
          All plugins
        </Link>
        <ChevronRight fontSize="small" />
        <Link style={{ fontWeight: '700' }} href={''} scroll>
          {category?.category ||
            (tag &&
              tag[0]?.tag[0]?.toUpperCase() + tag[0]?.tag?.substring(1)) ||
            'All categories'}
        </Link>
      </div>
      <h1 className={styles.header}>
        {plugins?.metadata?.totalCount} Best{' '}
        <span>
          {category?.category ||
            (tag && tag[0]?.tag[0]?.toUpperCase() + tag[0]?.tag?.substring(1))}
        </span>{' '}
        WordPress plugins
      </h1>
      <Separator />
      <div className={styles.content}>
        {!middleScreen && (
          <Filter
            setIsFilter={setIsFilter}
            categories={categories}
            setData={setFilter}
            isFilter={isFilter}
            //@ts-ignore
            data={filter}
            //@ts-ignore
            tag={tag}
          />
        )}
        <div className={styles.list}>
          <div className={styles.title_ctn}>
            <span>All results ({plugins?.metadata?.totalCount})</span>
            {middleScreen && (
              <button onClick={handleFilterModal}>
                <HiFilter color={'black'} size={22} /> Filter
              </button>
            )}
          </div>
          <Pluginlist isLoading={isLoading} data={plugins?.data} />
          <div className={styles.pagination}>
            {initialRender && pagesCount > 1 && plugins?.data && !isLoading && (
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
                onChange={handlePageChange}
                count={pagesCount}
                size="medium"
                page={page}
              />
            )}
          </div>
        </div>
      </div>
      <Experience />
    </main>
  );
};
