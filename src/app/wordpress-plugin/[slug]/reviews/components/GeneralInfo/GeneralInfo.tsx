'use client';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';

import { IPlugin } from '@/@types/plugin';

import Star from './star.svg';
import Dot from './dot.svg';

import styles from './generalInfo.module.scss';

export default function GeneralInfo({
  plugin,
  text,
}: {
  plugin: IPlugin;
  text?: string;
}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={plugin?.logo} alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.firstRow}>
          <p
            dangerouslySetInnerHTML={{
              __html: `${plugin?.plugin_name} ${text || ''}` || '',
            }}
            className={classNames(styles.name)}
          />
        </div>
        <div className={styles.numbers}>
          <span>
            <Star /> {plugin?.rating}
          </span>
          <Dot />
          <p className={styles.category}>{plugin?.category?.category}</p>
        </div>

        <p
          className={classNames(styles.shortTitle, styles.oneLineEllipsis)}
          dangerouslySetInnerHTML={{ __html: plugin?.short_title || '' }}
        />
        <div className={styles.bottom}>
          <div className={styles.tags}>
            {plugin?.tags?.map((tag) => (
              <p
                onClick={() =>
                  router.push(`/wordpress-plugins/tag/${tag?.slug}`)
                }
                className={styles.tag}
                key={tag?.id}
              >
                {tag?.tag[0]?.toUpperCase() + tag?.tag?.substring(1)}
              </p>
            ))}
          </div>

          <Link
            href={`/wordpress-plugin/${plugin?.plugin_slug}`}
            className={styles.link}
          >
            Go To Plugin Page
          </Link>
        </div>
      </div>
    </div>
  );
}
