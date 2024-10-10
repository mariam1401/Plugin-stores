'use client';
import { useMediaQuery } from '@mui/material';
import classNames from 'classnames';
import Link from 'next/link';

import { Separator } from '@/app/wordpress-plugin/[slug]/components/Separator/Separator';

import { IPlugin } from '@/@types/plugin';

import Download from './download.svg';
import RightBig from './rightBig.svg';
import Star from './star.svg';
import Dot from './dot.svg';

import styles from './generalInfo.module.scss';

export default function GeneralInfo({ plugin }: { plugin: IPlugin }) {
  const smallScreen = useMediaQuery('(max-width:768px)');
  return (
    <div className={styles.container}>
      <div className={styles.leftInfo}>
        <div className={styles.pluginInfo}>
          <div className={styles.item}>
            <img className={styles.logo} src={plugin?.logo ? plugin.logo : 'https://plugin-store-assets.s3.amazonaws.com/icon.png'} alt="" />
            <div className={styles.infoSection}>
              <div
                dangerouslySetInnerHTML={{ __html: plugin?.plugin_name || '' }}
                className={classNames(styles.name, styles.oneLineEllipsis)}
              />
              <div className={styles.info}>
                <p className={styles.rating}>
                  <Star />
                  {plugin?.rating}
                </p>
                <Dot />
                <>
                  <p className={styles.downloads}>
                    <Download />
                    {Intl.NumberFormat('en-US', {
                      maximumFractionDigits: 1,
                      notation: 'compact',
                    }).format(plugin?.active_installations ?? 0)}
                  </p>
                  <Dot />
                </>
                <p className={styles.category}>{plugin?.category?.category}</p>
                {!smallScreen && (
                  <Link
                    href={`/wordpress-plugin/${plugin?.plugin_slug}/`}
                    className={styles.learnMore}
                    scroll
                  >
                    Learn more <RightBig />
                  </Link>
                )}
              </div>
            </div>
          </div>
          {smallScreen && <Separator color={'#EAEAEA'} />}

          {smallScreen && (
            <Link
              href={`/wordpress-plugin/${plugin?.plugin_slug}/`}
              className={styles.learnMore}
              scroll
            >
              Learn more <RightBig />
            </Link>
          )}
        </div>
        <h1 className={styles.intro}>
          Top{' '}
          <span
            dangerouslySetInnerHTML={{ __html: plugin?.plugin_name || '' }}
            className={styles.pluginName}
          />{' '}
          Alternatives and Competitors
        </h1>
        <p
          dangerouslySetInnerHTML={{ __html: plugin?.short_title || '' }}
          className={styles.pluginDescription}
        />
      </div>
      {plugin?.cover_photo && (
        <img className={styles.coverPhoto} src={plugin?.cover_photo} />
      )}
    </div>
  );
}
