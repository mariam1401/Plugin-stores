'use client';
import { useEffect, useState, useRef } from 'react';

import { PaginationItem, useMediaQuery, Pagination } from '@mui/material';
import classNames from 'classnames';
import Link from 'next/link';

import { useAlternativesList } from '@/lib/useAlternativesList';
import { ALTERNATIVES_PAGE_PER_LIMIT } from '@/lib/consts';
import { IPlugin } from '@/@types/plugin';

import Download from './download.svg';
import Star from './star.svg';
import Dot from './dot.svg';

import styles from './allAlternatives.module.scss';

export default function AllAlternatives({ plugin }: { plugin: IPlugin }) {
  const ref = useRef<HTMLDivElement>(null);
  const [initialRender, setInitialRender] = useState(false);
  const smallScreen = useMediaQuery('(max-width:768px)');
  const [page, setPage] = useState(1);
  const {
    metadata: { totalCount },
    data,
  } = useAlternativesList({
    offset: (page - 1) * ALTERNATIVES_PAGE_PER_LIMIT,
    id: plugin?.plugin_id,
  });

  const pagesCount = Math.ceil(totalCount / ALTERNATIVES_PAGE_PER_LIMIT);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    setInitialRender(true);
  }, []);

  if (!data || !data?.length) {
    return <div></div>;
  }
  return (
    <div className={styles.container} ref={ref}>
      <p className={styles.title}>All similar plugins</p>
      <div className={styles.items}>
        {data?.map((eachItem) => (
          <div className={styles.pluginInfo} key={eachItem?.plugin_id}>
            <div className={styles.item}>
              <img className={styles.logo} src={eachItem?.logo} alt="" />
              <div className={styles.infoSection}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: eachItem?.plugin_name || '',
                  }}
                  className={classNames(styles.name, styles.twoLineEllipsis)}
                />
                <div className={styles.info}>
                  <p className={styles.rating}>
                    <Star />
                    {eachItem?.rating}
                  </p>
                  <Dot />
                  <>
                    <p className={styles.downloads}>
                      <Download />
                      {Intl.NumberFormat('en-US', {
                        maximumFractionDigits: 1,
                        notation: 'compact',
                      }).format(eachItem?.active_installations ?? 0)}
                    </p>
                    <Dot />
                  </>
                  <p className={styles.category}>{eachItem?.category_name}</p>
                </div>
                <div className={styles.itemTitleRow}>
                  <p
                    className={classNames(
                      styles.shortTitle,
                      styles.twoLineEllipsis,
                    )}
                    dangerouslySetInnerHTML={{
                      __html: eachItem?.short_title || '',
                    }}
                  />

                  {!smallScreen && (
                    <Link
                      href={`/wordpress-plugin/${eachItem?.plugin_slug}`}
                      className={styles.learnMore}
                      scroll
                    >
                      Go to Plugin Page
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {smallScreen && (
              <Link
                href={`/wordpress-plugin/${eachItem?.plugin_slug}`}
                className={styles.learnMore}
                scroll
              >
                Go to Plugin Page
              </Link>
            )}
          </div>
        ))}
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
            onChange={handlePageChange}
            count={pagesCount}
            size="medium"
            page={page}
          />
        )}
      </div>
    </div>
  );
}
