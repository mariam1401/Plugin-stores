import { ReactNode } from 'react';

import { AddOn } from '@/app/wordpress-plugin/[slug]/components/AddOn/AddOn';

import { IPlugin } from '@/@types/plugin';

import styles from './viewAlternatives.module.scss';

interface IView {
  data: IPlugin['more_plugins_like_this']['data'];
  title: ReactNode;
}

export const ViewAlternatives = ({ title, data }: IView) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.texts}>
          <h2>{title || ''}</h2>
        </div>
      </div>

      <div className={styles.pluginsList}>
        {data
          ?.slice(0, 4)
          ?.map((eachPlugin) => (
            <AddOn
              downloads={eachPlugin?.active_installations}
              category_name={eachPlugin?.category_name}
              shortTitle={eachPlugin?.short_title}
              slug={eachPlugin?.plugin_slug}
              name={eachPlugin?.plugin_name}
              rating={eachPlugin?.rating!}
              key={eachPlugin?.plugin_id}
              className={styles.plugin}
              image={eachPlugin?.logo ? eachPlugin?.logo : '/defaultLogo.png'}
              isBlackTheme
            />
          ))}
      </div>
    </div>
  );
};
