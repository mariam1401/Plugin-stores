'use client';

import { ChangeEvent, useCallback, useState } from 'react';

import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';

import NotFoundIcon from '@/app/wordpress-plugins/components/SearchInput/notFoundIcon.svg';
import style from '@/app/wordpress-plugins/components/SearchInput/searchInput.module.scss';
import CloseIcon from '@/app/wordpress-plugins/components/SearchInput/closeIcon.svg';
import Logo from '@/app/components/PluginsList/pluginIcon.svg';

import { usePluginTagList } from '@/lib/usePluginTagList';
import useOutsideClick from '@/lib/useOutsideClick';
import { IPlugin } from '@/@types/plugin';

import WordpressIcon from './wordpressIcon.svg';
import SearchIcon from './searchIcon.svg';
import SearchBtn from './btnSearch.svg';
import LegoIcon from './legoIcon.svg';

import styles from './pageSearchBox.module.scss';

export const PageSearchBox = () => {
  const [query, setQuery] = useState('');
  const [isOpenedResult, setIsOpenedResult] = useState(false);
  const smallScreen = useMediaQuery('(max-width:768px)');
  const router = useRouter();
  const { isLoading, plugins, tag } = usePluginTagList({
    query,
  });
  const closeResult = useCallback(() => {
    if (isOpenedResult) {
      setIsOpenedResult(false);
    }
  }, [isOpenedResult]);

  const openResult = () => {
    if (!isOpenedResult) {
      setIsOpenedResult(true);
    }
  };

  const resultRef = useOutsideClick<HTMLDivElement>(
    closeResult,
    isOpenedResult && (plugins !== null || tag !== null),
  );
  const handleChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuery(value);
  };
  const redirectToTag = (slug?: string) => {
    if (slug) {
      router.push(`/wordpress-plugins/tag/${slug}/`);
    }
  };
  const redirectToSearchPage = () => {
    if (query) {
      router.push(`/wordpress-plugins/search/${query}/`);
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      redirectToSearchPage();
    }
  };
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Discover a diverse selection of{' '}
        <span>
          <WordpressIcon /> plugins!
        </span>
      </p>

      <div className={styles.inputSection}>
        <input
          placeholder="Find the best WordPress plugins"
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          onClick={openResult}
          value={query}
        />
        <LegoIcon className={styles.legoIcon} />
        {isLoading && (
          <div className={classNames(styles.loader, styles.rightIcon)} />
        )}
        {query && !isLoading && (
          <CloseIcon
            onClick={() => {
              setQuery('');
            }}
            className={classNames(styles.rightIcon)}
          />
        )}
        {smallScreen ? (
          <SearchBtn
            onClick={redirectToSearchPage}
            className={styles.searchIcon}
          />
        ) : (
          <SearchIcon
            onClick={redirectToSearchPage}
            className={styles.searchIcon}
          />
        )}
        <>
          {(plugins?.data !== null || tag?.data !== null) && isOpenedResult && (
            <>
              {plugins?.data?.length === 0 && tag?.data?.length === 0 ? (
                <div className={style.resultSection} ref={resultRef}>
                  <div className={style.eachPluginLink}>
                    <NotFoundIcon />
                    <p>No results with this query</p>
                  </div>
                </div>
              ) : (
                <div className={style.resultSection} ref={resultRef}>
                  <div className={styles.section}>
                    <p className={styles.p}>
                      Results by Tags{' '}
                      {tag?.data?.length === 0 && `(${0} results)`}
                    </p>
                    {tag?.data && tag?.data?.slice(0, 5)?.length > 0 && (
                      <div className={styles.tags}>
                        {tag?.data?.map(
                          (el: { slug: string; tag: string }, i: number) => {
                            return (
                              <button
                                onClick={() => redirectToTag(el?.slug)}
                                key={i}
                              >
                                #
                                {el?.tag[0]?.toUpperCase() +
                                  el?.tag?.substring(1)}
                              </button>
                            );
                          },
                        )}
                      </div>
                    )}
                  </div>
                  <div className={styles.section}>
                    <p className={styles.p}>
                      Results by Plugins{' '}
                      {plugins?.data &&
                        plugins?.data?.length === 0 &&
                        `(${0} results)`}
                    </p>
                    {plugins?.data &&
                      plugins?.data?.length > 0 &&
                      plugins?.data?.map((eachPlugin: IPlugin) => (
                        <Link
                          href={`/wordpress-plugin/${eachPlugin?.plugin_slug}/`}
                          className={style.eachPluginLink}
                          key={eachPlugin?.plugin_slug}
                          onClick={closeResult}
                          scroll
                        >
                          {eachPlugin?.logo ? (
                            <img
                              className={style.logo}
                              src={eachPlugin?.logo}
                              alt="#"
                            />
                          ) : (
                            <Logo className={style.logo} />
                          )}

                          <p
                            dangerouslySetInnerHTML={{
                              __html: eachPlugin?.plugin_name || '',
                            }}
                            className={style.title}
                          />
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};
