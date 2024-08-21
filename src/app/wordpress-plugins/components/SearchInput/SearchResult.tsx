import { LegacyRef } from 'react';

import Link from 'next/link';

import styles from '@/app/wordpress-plugins/components/SearchInput/searchInput.module.scss';
import NotFoundIcon from '@/app/wordpress-plugins/components/SearchInput/notFoundIcon.svg';
import Logo from '@/app/components/PluginsList/pluginIcon.svg';

import { IPlugin } from '@/@types/plugin';

interface ISearchResult {
  resultRef: LegacyRef<HTMLDivElement> | undefined;
  isOpenedResult: boolean;
  data: IPlugin[] | null;
  // eslint-disable-next-line no-unused-vars
  handleTags?: (e: any) => void;
  onClose?: () => void;
  isTag?: boolean;
}

export const SearchResult = ({
  isOpenedResult,
  handleTags,
  resultRef,
  onClose,
  isTag,
  data,
}: ISearchResult) => {
  return (
    <>
      {data !== null && isOpenedResult && (
        <div className={styles.resultSection} ref={resultRef}>
          {data?.length === 0 && (
            <div className={styles.eachPluginLink}>
              <NotFoundIcon />
              <p>No results with this query</p>
            </div>
          )}
          {isTag
            ? data?.map((el: IPlugin, index: number) => {
                return (
                  <p
                    onClick={() => {
                      if (handleTags) {
                        handleTags(el);
                      }
                      onClose?.();
                    }}
                    className={styles.tag}
                    key={index}
                  >
                    {el?.tag}
                  </p>
                );
              })
            : data?.map((eachPlugin) => (
                <Link
                  onClick={() => {
                    onClose?.();
                  }}
                  href={`/wordpress-plugin/${eachPlugin.plugin_slug}`}
                  className={styles.eachPluginLink}
                  key={eachPlugin.plugin_slug}
                  scroll
                >
                  {eachPlugin.logo ? (
                    <img
                      className={styles.logo}
                      src={eachPlugin.logo}
                      alt="#"
                    />
                  ) : (
                    <Logo className={styles.logo} />
                  )}

                  <p
                    dangerouslySetInnerHTML={{
                      __html: eachPlugin.plugin_name || '',
                    }}
                    className={styles.title}
                  />
                </Link>
              ))}
        </div>
      )}
    </>
  );
};
