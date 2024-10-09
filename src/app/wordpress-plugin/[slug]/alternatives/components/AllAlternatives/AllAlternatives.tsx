'use client';
import { useEffect, useState, useRef } from 'react';

import { useMediaQuery } from '@mui/material';
import classNames from 'classnames';
import Link from 'next/link';
import { Oval } from 'react-loader-spinner'

import { useAlternativesList } from '@/lib/useAlternativesList';
import { ALTERNATIVES_PAGE_PER_LIMIT } from '@/lib/consts';
import { IMorePlugins, IPlugin } from '@/@types/plugin';

import Download from './download.svg';
import Star from './star.svg';
import Dot from './dot.svg';

import styles from './allAlternatives.module.scss';
import debounce from 'lodash.debounce';

export default function AllAlternatives({ plugin }: { plugin: IPlugin }) {
  const ref = useRef<HTMLDivElement>(null);
  const [initialRender, setInitialRender] = useState(false);
  const smallScreen = useMediaQuery('(max-width:768px)');
  const [allData, setAllData] = useState<IMorePlugins[]>([]);
  const [offsetTemp, setOffsetTemp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    metadata: { totalCount, lastEvaluatedKey },
    data,
  } = useAlternativesList({
    offset: offsetTemp,
    id: plugin?.plugin_id,
  });
  useEffect(() => {
    if (data) {
      setAllData((prevData) => [...prevData, ...data]);
      setIsLoading(false)
    }
  }, [data]);

  const pagesCount = Math.ceil(totalCount / ALTERNATIVES_PAGE_PER_LIMIT);

  // Debounced showMore function to reduce unnecessary API calls
  const showMore = debounce(() => {
    if (lastEvaluatedKey?.SK?.S && !isLoading) {
      setIsLoading(true);
      setOffsetTemp(lastEvaluatedKey?.SK?.S);
    }
  }, 100);

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
        {allData?.map((eachItem: any) => (
          <div className={styles.pluginInfo} key={eachItem?.plugin_id}>
            <div className={styles.item}>
              <img className={styles.logo} src={eachItem?.logo ? eachItem?.logo : 'https://plugin-store-assets.s3.amazonaws.com/icon.png'} alt="" loading="lazy" />
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
        {initialRender && pagesCount > 1 && lastEvaluatedKey?.SK?.S && (
          <button onClick={showMore} className={styles.showMoreBtn}>
            {isLoading ?
                <Oval
                    height="25"
                    width="25"
                    color="#3339F1"
                    secondaryColor='#3339F1'
                />
                :
                'Show more'
            }
          </button>
        )}
      </div>
    </div>
  );
}
