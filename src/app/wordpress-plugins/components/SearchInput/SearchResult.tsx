import {LegacyRef, useState} from 'react';

import Link from 'next/link';

import styles from '@/app/wordpress-plugins/components/SearchInput/searchInput.module.scss';
import NotFoundIcon from '@/app/wordpress-plugins/components/SearchInput/notFoundIcon.svg';
import Logo from '@/app/components/PluginsList/pluginIcon.svg';

import {IPlugin, ITag} from '@/@types/plugin';

interface ISearchResult {
  resultRef: LegacyRef<HTMLDivElement> | undefined;
  isOpenedResult: boolean;
  data: IPlugin[] | null;
  // eslint-disable-next-line no-unused-vars
  handleTags?: (e: any) => void;
  onClose?: () => void;
  isTag?: boolean;
  selectedTags?:ITag[];
  // eslint-disable-next-line no-unused-vars
  removeTag?:(e:any)=>void

}

export const SearchResult = ({
  isOpenedResult,
  selectedTags,
  handleTags,
  removeTag,
  resultRef,
  onClose,
  isTag,
  data,
}: ISearchResult) => {
  const handleCheckboxChange = (tag:ITag) => {
    if (selectedTags?.some(e=>e?.tag === tag?.tag)) {
      selectedTags?.filter((t) => t?.tag !== tag?.tag);
      if (removeTag) {
        removeTag(tag)
      }
    } else {
      selectedTags = [...(selectedTags ?? []), tag];
    }
    if (handleTags) {
      handleTags(tag);
    }
    if (onClose) {
      onClose()
    }
  };

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
              const isSelected = selectedTags?.some(e=>e?.tag === el?.tag)
                return (
                    <div  key={index} className={styles.tag_list}>
                      <input
                          className={styles.tag_ckb}
                          type={"checkbox"}
                          checked={isSelected}
                          onChange={() => handleCheckboxChange(el)}

                          />
                      <label className={styles.tag}>{el?.tag}</label>
                    </div>
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
