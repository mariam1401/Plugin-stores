'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

import { SearchResult } from '@/app/wordpress-plugins/components/SearchInput/SearchResult';

import useOutsideClick from '@/lib/useOutsideClick';
import { usePluginList } from '@/lib/usePluginList';
import getCategories from '@/lib/getCategories';
import { useTagList } from '@/lib/useTagList';
import { ICategory } from '@/@types/plugin';

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
      [styles.isSelected]: selectedCategory === `${category.slug}`,
    })}
    onClick={() =>
      onClick(selectedCategory === `${category.slug}` ? '' : `${category.slug}`)
    }
  >
    <div className={styles.image_ctn}>
      <img
        style={{
          filter:
            selectedCategory === category.slug
              ? 'invert(9%) sepia(99%) saturate(5630%) hue-rotate(246deg) brightness(111%) contrast(148%)'
              : 'none',
        }}
        src={`${basePath}${category.icon_path}`}
      />
      <p className={styles.title}>{category.category}</p>
    </div>
  </div>
);

export default function SearchInput({
  placeholder,
  isTagSearch,
  hideButton,
  handleTags,
}: {
  handleTags?: () => void;
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
  const { isLoading, data } = isTagSearch
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useTagList({ query })
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      usePluginList({
        limit: 21,
        page: 1,
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
    isOpenedResult && data !== null,
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

        <SearchResult
          onClose={() => setIsOpenedResult(false)}
          isOpenedResult={isOpenedResult}
          handleTags={handleTags}
          resultRef={resultRef}
          isTag={isTagSearch}
          data={data}
        />
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
            {categories.map((eachCategory) => (
              <EachCategoryFilter
                selectedCategory={selectedCategory}
                onClick={handleCategoryChange}
                category={eachCategory}
                key={eachCategory.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
