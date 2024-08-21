'use client';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';

import styles from '@/app/wordpress-plugins/components/PerformanceOptimizationPlugins/view.module.scss';
import Arrow from '@/app/wordpress-plugin/[slug]/components/AddOns/arrow.svg';
import { AddOn } from '@/app/wordpress-plugin/[slug]/components/AddOn/AddOn';

import { IPlugin } from '@/@types/plugin';

import RightBig from './rightBig.svg';
import Star from './star.svg';
import Win from './win.svg';
import Dot from './dot.svg';

interface IView {
  data: IPlugin[];
  title: string;
  description?: string;
  winner?: IPlugin;
  path?: string;
}

export const View = ({ description, winner, title, data, path }: IView) => {
  const router = useRouter();
  const redirectToCategoryPage = () => {
    if (path) {
      router.push('/wordpress-plugins/performance-optimization');
    }
  };

  const sortedData = data?.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
  let winnerPlugin;

  if (winner) {
    winnerPlugin = winner;
  } else if (sortedData && sortedData[0]) {
    winnerPlugin = sortedData[0];
  }

  if (!winner && sortedData) {
    sortedData?.shift();
  }

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
        <div className={styles.eachColumn}>
          {sortedData
            ?.slice(0, 3)
            ?.map((eachPlugin) => (
              <AddOn
                category_name={eachPlugin?.category?.category}
                downloads={eachPlugin?.active_installations}
                shortTitle={eachPlugin?.short_title}
                slug={eachPlugin?.plugin_slug}
                name={eachPlugin?.plugin_name}
                rating={eachPlugin?.rating!}
                key={eachPlugin?.plugin_id}
                className={styles.plugin}
                image={eachPlugin?.logo}
                isBlackTheme
              />
            ))}
        </div>
        <div className={styles.eachColumn}>
          <div className={styles.winner}>
            <div className={styles.winnerSection}>
              <div className={styles.win}>
                <Win />
                Category winner:
              </div>
              <div className={styles.winnerName}>
                <img src={winnerPlugin?.logo} className={styles.logo} />{' '}
                <div
                  dangerouslySetInnerHTML={{
                    __html: winnerPlugin?.plugin_name?.slice(0, 13) || '',
                  }}
                  className={classNames(styles.name, styles.twoLineEllipsis)}
                />
                <Dot />
                <span>
                  <Star /> {winnerPlugin?.rating}
                </span>
              </div>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: winnerPlugin?.short_title || '',
              }}
              className={styles.shortTitle}
            />

            <Link
              href={`/wordpress-plugin/${winnerPlugin?.plugin_slug}`}
              className={styles.learnMore}
              scroll
            >
              Learn more <RightBig />
            </Link>
          </div>
          {sortedData && sortedData[4] && (
            <AddOn
              category_name={sortedData[4]?.category?.category}
              downloads={sortedData[4]?.active_installations}
              shortTitle={sortedData[4]?.short_title}
              slug={sortedData[4]?.plugin_slug}
              name={sortedData[4]?.plugin_name}
              rating={sortedData[4]?.rating!}
              key={sortedData[4]?.plugin_id}
              image={sortedData[4]?.logo}
              className={styles.plugin}
              isBlackTheme
            />
          )}
        </div>
      </div>
    </div>
  );
};
