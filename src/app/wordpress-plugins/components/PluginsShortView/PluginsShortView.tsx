'use client';

import { useRouter } from 'next/navigation';
import classNames from 'classnames';

import Arrow from '@/app/wordpress-plugin/[slug]/components/AddOns/arrow.svg';
import { AddOn } from '@/app/wordpress-plugin/[slug]/components/AddOn/AddOn';

import { IPlugin } from '@/@types/plugin';

import styles from './pluginsShortView.module.scss';

interface IPluginsShortView {
  data: IPlugin[];
  title: string;
  withActiveInstallations?: boolean;
  withTwoColumns?: boolean;
  isBlackTheme?: boolean;
  description?: string;
  path?: string;
}

export const PluginsShortView = ({
  withActiveInstallations,
  withTwoColumns,
  isBlackTheme,
  description,
  title,
  data,
  path,
}: IPluginsShortView) => {
  const router = useRouter();
  const redirectToCategoryPage = () => {
    if (path) {
      router.push(`/wordpress-plugins/${path}/`);
    } else {
      router.push('/wordpress-plugins/all/');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.texts}>
          <h2>{title || ''}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <button onClick={redirectToCategoryPage} className={styles.seeAll}>
          See all <Arrow />
        </button>
      </div>

      <div className={styles.pluginsList}>
        {data?.map((eachPlugin) => (
          <AddOn
            active_installations={
              !withTwoColumns ? eachPlugin?.active_installations : undefined
            }
            className={classNames(styles.plugin, {
              [styles.withTwoColumns]: withTwoColumns,
            })}
            withActiveInstallations={withActiveInstallations}
            category_name={eachPlugin?.category?.category}
            downloads={eachPlugin?.active_installations}
            shortTitle={eachPlugin?.short_title}
            slug={eachPlugin?.plugin_slug}
            name={eachPlugin?.plugin_name}
            rating={eachPlugin?.rating!}
            isBlackTheme={isBlackTheme}
            key={eachPlugin?.plugin_id}
            image={eachPlugin?.logo ? eachPlugin?.logo : 'https://plugin-store-assets.s3.amazonaws.com/icon.png'}
          />
        ))}
      </div>
    </div>
  );
};
