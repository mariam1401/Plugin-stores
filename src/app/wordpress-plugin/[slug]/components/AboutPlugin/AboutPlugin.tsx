import { useRouter } from 'next/navigation';
import classNames from 'classnames';

import { Tooltip } from '@/app/wordpress-plugin/[slug]/components/Tooltip/Tooltip';

import { IContributor, IPlugin, ITag } from '@/@types/plugin';

import Arrow from './arrow.svg';

import styles from './aboutPlugin.module.scss';

export function AboutPlugin({
  contributor,
  plugin,
}: {
  contributor: IContributor[];
  plugin: IPlugin;
}) {
  const visibleLanguages = (plugin?.languages?.slice(0, 2) || [])
    ?.map((language) => language?.language)
    ?.join(', ');
  const hiddenLanguages = plugin?.languages?.slice(3) || [];
  const hiddenLanguagesCount = hiddenLanguages?.length ?? 0;
  const hiddenLanguagesText = hiddenLanguages
    ?.map((language) => language?.language)
    ?.join(', ');
  const router = useRouter();

  const link = plugin?.link_to_learning_resources
    ? Array.isArray(plugin?.link_to_learning_resources)
      ? plugin?.link_to_learning_resources[0] || ''
      : plugin?.link_to_learning_resources
    : '';

  const datePart = plugin?.last_updated?.split(' ')[0];
  const dateObject = new Date(datePart);
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = dateObject.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className={styles.aboutPlugin}>
      <h4 className={styles.title}>About this plugin</h4>
      <div className={styles.items}>
        {contributor && contributor[0] && contributor[0]?.author_name && (
          <div>
            <span className={styles.label}>Author:</span>
            {` `}
            <a
                href={`/wordpress-plugins/profiles/${contributor && contributor[0] && contributor[0]?.slug}/`}
                className={classNames(styles.value, styles.underline)}
                style={{ cursor: 'pointer' }}
            >
              {contributor && contributor[0] && contributor[0]?.author_name}
            </a>
          </div>
        )}
        <div className={styles.item}>
          <span className={styles.label}>Categories:</span>
          {` `}
          <a href={`/wordpress-plugins/${plugin?.category?.slug}/`}
            className={classNames(styles.value, styles.underline)}
            style={{ cursor: 'pointer' }}
          >
            {plugin?.category?.category || ''}
          </a>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Version:</span>
          {` `}
          <span className={styles.value}>{plugin?.version}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Last updated:</span>
          {` `}
          <span className={styles.value}>{formattedDate}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>WordPress version:</span>
          {` `}
          <span className={styles.value}>{plugin?.wp_version_required}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Tested up to:</span>
          {` `}
          <span className={styles.value}>{plugin?.tested_up_to}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>PHP version required:</span>
          {` `}
          <span className={styles.value}>
            {plugin?.php_version_required || 0}
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Languages:</span>
          {` `}
          <span className={styles.value}>{visibleLanguages}</span>
          {hiddenLanguagesCount > 0 && (
            <>
              {` `}
              <span
                className={classNames(styles.value, styles.underline)}
                id="languageTooltip"
              >
                {`[+${hiddenLanguagesCount}]`}
              </span>
              <Tooltip anchorSelect="#languageTooltip">
                {hiddenLanguagesText}
              </Tooltip>
            </>
          )}
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Tags:</span>
          <div className={styles.tags}>
            {plugin?.tags?.map((tag: ITag) => (
              <a href={`/wordpress-plugins/tag/${tag?.slug}/`}
                className={styles.tag}
                key={tag?.id}
              >
                {tag?.tag[0]?.toUpperCase() + tag?.tag?.substring(1)}
              </a>
            ))}
          </div>
        </div>
        {link[0] && (
          <div className={styles.item}>
            <span className={styles.label}>Learning resources:</span>
            {` `}
            {link && (
              <a
                className={classNames(styles.value, styles.underline)}
                href={link}
              >
                View resources
                <Arrow />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
