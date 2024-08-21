'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';

import { Loader } from '@/app/wordpress-plugin/[slug]/components/Loader/Loader';
import RightIcon from '@/app/components/PluginsList/rightIcon.svg';
import Logo from '@/app/components/PluginsList/pluginIcon.svg';

import getAllPosts from '@/lib/getAllPosts';
import { IPlugin } from '@/@types/plugin';

import styles from './pluginsList.module.scss';

export interface Data {
  metadata: {
    totalCount: number;
  };
  data: IPlugin[] | [];
}

export default function PluginsList({ initialData }: { initialData: Data }) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [{ metadata, data }, setData] = useState<Data>(initialData);

  useEffect(() => {
    setIsLoading(true);
    //@ts-ignore
    getAllPosts({ query: searchParams.get('query'), page: 1 })
      .then((response) => {
        setData(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <>
      <p className={styles.category}>
        Plugins by category ({metadata?.totalCount || 0})
      </p>
      <div className={styles.plugins}>
        {isLoading && (
          <div className={styles.overlayLoading}>
            <Loader />
          </div>
        )}

        {data?.map((eachPlugin) => (
          <Link
            href={`/wordpress-plugin/${eachPlugin?.plugin_slug}`}
            className={styles.eachPlugin}
            key={eachPlugin?.plugin_slug}
            scroll
          >
            <Logo className={styles.logo} />
            <span className={styles.pluginInfo}>
              <div className={styles.titleRow}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: eachPlugin?.plugin_name || '',
                  }}
                  className={styles.title}
                />
                <RightIcon className={styles.icon} />
              </div>
              <p className={classNames(styles.description, 'notFound')}>
                {eachPlugin?.description}
              </p>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
