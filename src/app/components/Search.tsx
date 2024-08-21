'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';

import NotFoundIcon from '@/app/wordpress-plugins/components/SearchInput/notFoundIcon.svg';
import style from '@/app/wordpress-plugins/components/SearchInput/searchInput.module.scss';
import Logo from '@/app/components/PluginsList/pluginIcon.svg';

import { usePluginTagList } from '@/lib/usePluginTagList';
import { ICategory, IPlugin } from '@/@types/plugin';
import useOutsideClick from '@/lib/useOutsideClick';
import getCategories from '@/lib/getCategories';

import SearchIcon from './searchIcon.svg';
import CloseIcon from './closeIcon.svg';
import Menu from './menuIcon.svg';

import styles from './searchInput.module.scss';
const basePath = 'https://storage.googleapis.com/pluginstore-plugins-images/';
const EachCategoryFilter = ({
  selectedCategory,
  category,
  onClick,
}: {
  // eslint-disable-next-line no-unused-vars
  onClick: (id: string) => void;
  selectedCategory: string;
  category: ICategory;
}) => (
  <div
    className={classNames(styles.eachCategory, {
      [styles.isSelected]: selectedCategory === `${category?.slug}`,
    })}
    onClick={() =>
      onClick(
        selectedCategory === `${category?.slug}` ? '' : `${category?.slug}`,
      )
    }
  >
    <div className={styles.image_ctn}>
      <img
        style={{
          filter:
            selectedCategory === category?.slug
              ? 'invert(9%) sepia(99%) saturate(5630%) hue-rotate(246deg) brightness(111%) contrast(148%)'
              : 'none',
        }}
        src={`${basePath}${category?.icon_path}`}
      />
      <p className={styles.title}>{category?.category}</p>
    </div>
  </div>
);

export default function Search({
  placeholder,
  isTagSearch,
  hideButton,
}: {
  isTagSearch?: boolean;
  placeholder?: string;
  hideButton?: boolean;
}) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpenedResult, setIsOpenedResult] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const middleScreen = useMediaQuery('(max-width:1260px)');
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, plugins, tag } = usePluginTagList({
    query,
  });
  const close = useCallback(() => {
    if (isOpened) {
      setIsOpened(false);
    }
  }, [isOpened]);

  const open = () => {
    if (!isOpened) {
      setIsOpened(true);
    }
  };
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

  const menuRef = useOutsideClick<HTMLDivElement>(close, isOpened);
  const resultRef = useOutsideClick<HTMLDivElement>(
    closeResult,
    isOpenedResult && plugins !== null,
  );

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    router.push(`/wordpress-plugins/${id}`);
    setIsOpened(false);
  };

  const handleChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuery(value);
  };

  useEffect(() => {
    const get = async () => {
      return getCategories();
    };
    get().then((data) => {
      setCategories(data);
    });
  }, []);
  const redirectToTag = (slug?: string) => {
    if (slug) {
      router.push(`/wordpress-plugins/tag/${slug}`);
      setIsOpenedResult(false);
    }
  };
  const redirectToSearchPage = () => {
    if (query) {
      router.push(`/wordpress-plugins/search/${query}`);
    }
  };
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      redirectToSearchPage();
      setIsOpenedResult(false);
    }
  };
  return (
    <div
      style={{ maxWidth: isTagSearch ? '100%' : 'auto' }}
      className={styles.searchInput}
    >
      <div className={styles.inputSection}>
        {(middleScreen && openInput) || isTagSearch ? (
          <div>
            <input
              placeholder={placeholder || 'Find the best WordPress plugins'}
              onKeyDown={handleKeyPress}
              onChange={handleChange}
              onClick={openResult}
              value={query}
            />
            {isTagSearch && <SearchIcon className={styles.searchIcon} />}
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
          </div>
        ) : middleScreen && !openInput ? (
          <div onClick={() => setOpenInput(true)} className={styles.search}>
            <SearchIcon className={styles.searchIcon} />
          </div>
        ) : (
          !middleScreen && (
            <div>
              <input
                placeholder={placeholder || 'Find the best WordPress plugins'}
                onKeyDown={handleKeyPress}
                onChange={handleChange}
                onClick={openResult}
                value={query}
              />
              <SearchIcon className={styles.searchIcon} />
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
            </div>
          )
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
                    {tag?.data && tag?.data?.length > 0 && (
                      <div className={styles.tags}>
                        {tag?.data
                          ?.slice(0, 10)
                          ?.map(
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
                          href={`/wordpress-plugin/${eachPlugin?.plugin_slug}`}
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
      {!hideButton && (
        <button className={styles.searchButton} onClick={open}>
          {isOpened ? (
            <>
              <CloseIcon
                style={{
                  fillOpacity: 1,
                }}
              />
              {!middleScreen && <span>All plugins</span>}
            </>
          ) : (
            <>
              <Menu />
              {!middleScreen && <span>All plugins</span>}{' '}
            </>
          )}
        </button>
      )}
      <div
        className={classNames(styles.categorySelector, {
          [styles.isOpened]: isOpened,
        })}
        ref={menuRef}
      >
        <div className={styles.categorySelectorContent}>
          <p className={styles.header}>Plugin categories</p>
          <div className={styles.categories}>
            {categories?.map((eachCategory) => (
              <EachCategoryFilter
                selectedCategory={selectedCategory}
                onClick={handleCategoryChange}
                category={eachCategory}
                key={eachCategory?.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
