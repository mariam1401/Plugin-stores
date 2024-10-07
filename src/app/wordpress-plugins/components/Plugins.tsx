'use client';

import { Loader } from '@/app/wordpress-plugin/[slug]/components/Loader/Loader';
import { AddOn } from '@/app/wordpress-plugin/[slug]/components/AddOn/AddOn';

import NotFound from '../notFoundIcon.svg';

import styles from '../page.module.scss';
//@ts-ignore
export const Pluginlist = ({ isLoading, data }) => {
  return (
    <div className={styles.list}>
      {isLoading ? (
        <div className={styles.loader_ctn}>
          <Loader />
        </div>
      ) : data?.length > 0 ? (
        <div className={styles.plugins_ctn}>
          {data?.map((el: any) => {
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
                image={el?.logo ? el?.logo :'/defaultLogo.png'}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.empty}>
          <NotFound />
          <span>No plugins with your specified parameters (0) </span>
        </div>
      )}
    </div>
  );
};
