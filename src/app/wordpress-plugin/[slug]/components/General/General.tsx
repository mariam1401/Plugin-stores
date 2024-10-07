'use client';
import { useEffect, useState } from 'react';

//@ts-ignore
import { SplideSlide, SplideTrack, Splide } from '@splidejs/react-splide';
import { useMediaQuery } from '@mui/material';
import classNames from 'classnames';

import '@splidejs/react-splide/css/core';

import ImagePreviewSection from '@/app/wordpress-plugin/[slug]/components/ImageViewer/ImageViewer';

import { IContributor, IScreenshot, IPlugin } from '@/@types/plugin';
import { calculateRatingSummary } from '@/lib/getAverageRating';

import Download from './download.svg';
import Message from './message.svg';
import Link from './link.svg';
import Star from './star.svg';
import Dot from './dot.svg';


import styles from './general.module.scss';
const basePath = 'https://storage.googleapis.com/pluginstore-plugins-images/';
const getImgUrl = (item: IScreenshot | string): string => {
  if (typeof item === 'string') {
    const videoId = item?.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})/)?.[1];
    const thumbnailUrl = videoId
      ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      : '';

    return thumbnailUrl;
  }
  return item?.screenshot_url;
};
export function General({
  reviews,
  author,
  plugin,
  text,
}: {
  author: IContributor[];
  reviews: number;
  plugin: IPlugin;
  text?: string;
}) {
  let demoUrls = ['#'];
  const middleScreen = useMediaQuery('(max-width:1260px)');
  const smallScreen = useMediaQuery('(max-width:768px)');
  const [rendered, setRendered] = useState(false);
  const images: (IScreenshot | undefined | string)[] = [];

  try {
    if (typeof plugin?.demo === 'string') {
      const t = plugin?.demo?.slice(1, plugin?.demo?.length - 1);
      demoUrls = t?.split(', ');
    } else {
      demoUrls = plugin?.demo || [];
    }
  } catch (e) {
    console.log('wrong Demo url', e);
  }
  if (plugin?.screenshots) {
    images?.push(
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...plugin?.screenshots?.map((eachItem) => ({
        ...eachItem,
        screenshot_url: basePath + eachItem?.screenshot_url,
      })),
    );
  }

  if (plugin?.video && plugin?.video?.includes('https://www.youtube.com/')) {
    images?.unshift(plugin?.video);
  }
  useEffect(() => {
    setRendered(true);
  }, []);

  return (
    <>
      <div
        className={classNames(styles.container, {
          [styles.full]:
            !plugin?.screenshots?.length &&
            !(
              plugin?.video &&
              plugin?.video?.includes('https://www.youtube.com/')
            ),
        })}
      >
        <div className={styles.left}>
          <div className={styles.logoInfo}>
            <img
              className={styles.logo}
              src={plugin?.logo || `/defaultLogo.png`}
              height={64}
              width={64}
              alt={plugin?.plugin_name || ''}
            />
            <div className={styles.info}>
              <div className={styles.div}>
                <h1
                  dangerouslySetInnerHTML={{
                    __html: `${plugin?.plugin_name} ${text || ''}` || '',
                  }}
                  className={styles.pName}
                />
                <div className={styles.header}>
                  {author && author[0] && (
                    <div>
                      <span>By</span>{' '}
                      <a
                        href={`/wordpress-plugins/profiles/${author[0]?.slug}`}
                        className={styles.link}
                      >
                        {author[0]?.author_name}
                      </a>
                    </div>
                  )}
                  {!smallScreen && author && author[0]?.author_name && <Dot />}
                  {!smallScreen && plugin?.official_website_link && (
                    <a
                      href={plugin?.official_website_link}
                      className={styles.link}
                      target="_blank"
                    >
                      Visit the website <Link />
                    </a>
                  )}
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: plugin?.short_title || '',
                  }}
                  className={styles.p}
                />
                {smallScreen && plugin?.official_website_link && (
                  <a
                    href={plugin?.official_website_link}
                    className={styles.link}
                    target="_blank"
                  >
                    Visit the website <Link />
                  </a>
                )}
              </div>
            </div>
          </div>

          {!middleScreen && (
            <>
              <div className={styles.pluginInfo}>
                <div className={styles.pluginInfoBox}>
                  <p className={styles.rating}>
                    <Star />
                    {
                      calculateRatingSummary(plugin?.rating_by_stars || null)
                        ?.averageRating
                    }
                  </p>
                  <p className={styles.ratingText}>Rating summary</p>
                </div>
                <div className={styles.separator} />
                <div className={styles.pluginInfoBox}>
                  <p className={styles.rating}>
                    <Message />
                    {reviews ?? 0}
                  </p>
                  <p className={styles.ratingText}>Reviews</p>
                </div>
                <div className={styles.separator} />
                <div className={styles.pluginInfoBox}>
                  <p className={styles.rating}>
                    <Download />
                    {Intl.NumberFormat('en-US', {
                      maximumFractionDigits: 1,
                      notation: 'compact',
                    })?.format(plugin?.active_installations ?? 0)}
                  </p>
                  <p className={styles.ratingText}>Active installations</p>
                </div>
              </div>
              <div className={styles.actionsRow}>
                <a
                  href={plugin?.download_button}
                  download={plugin?.plugin_name}
                  className={styles.action}
                >
                  Download the Plugin
                </a>
                {demoUrls?.[0] && (
                  <a
                    className={styles.action2}
                    href={demoUrls?.[0]}
                    target="_blank"
                  >
                    View Demo
                  </a>
                )}
              </div>
            </>
          )}
        </div>

        {!smallScreen &&
          !!(
            plugin?.screenshots?.length ||
            (plugin?.video &&
              plugin?.video?.includes('https://www.youtube.com'))
          ) && (
            <div className={styles.right}>
              <ImagePreviewSection plugin={plugin} />
            </div>
          )}
      </div>

      {middleScreen && (
        <>
          <div className={styles.pluginInfo}>
            <div className={styles.pluginInfoBox}>
              <p className={styles.rating}>
                <Star />
                {calculateRatingSummary(plugin?.rating_by_stars)?.averageRating}
              </p>
              <p className={styles.ratingText}>Rating summary</p>
            </div>
            <div className={styles.separator} />
            <div className={styles.pluginInfoBox}>
              <p className={styles.rating}>
                <Message />
                {reviews ?? 0}
              </p>
              <p className={styles.ratingText}>Reviews</p>
            </div>
            <div className={styles.separator} />
            <div className={styles.pluginInfoBox}>
              <p className={styles.rating}>
                <Download />
                {Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 1,
                  notation: 'compact',
                })?.format(plugin?.active_installations ?? 0)}
              </p>
              <p className={styles.ratingText}>Active installations</p>
            </div>
          </div>
          <div className={styles.actionsRow}>
            <a
              href={plugin?.download_button}
              download={plugin?.plugin_name}
              className={styles.action}
            >
              Download the Plugin
            </a>
            {demoUrls?.[0] && (
              <a
                className={styles.action2}
                href={demoUrls?.[0]}
                target="_blank"
              >
                View Demo
              </a>
            )}
          </div>
        </>
      )}
      {middleScreen && !!images?.length && (
        <div>
          <Splide
            options={{
              padding: {
                right: images?.length === 1 ? '0' : smallScreen ? '15%' : '25%',
              },
              gap: smallScreen ? '12px' : '16px',
              perPage: middleScreen ? 1 : 4,
              pagination: false,
              easing: 'linear',
              width: '100%',
              arrows: false,
              drag: 'free',
            }}
            aria-label="My Favorite Images"
            hasTrack={false}
          >
            <SplideTrack>
              {images?.slice(smallScreen ? 0 : 1)?.map((el: any, i) => {
                return (
                  <SplideSlide key={i}>
                    {typeof el === 'string' ? (
                      rendered && (
                        <iframe className={styles.video} src={el as string} />
                      )
                    ) : (
                      <div
                        style={{
                          backgroundImage: `url(${getImgUrl(el)})`,
                          backgroundSize: 'cover',
                        }}
                        className={styles.image}
                      ></div>
                    )}
                  </SplideSlide>
                );
              })}
            </SplideTrack>
          </Splide>
        </div>
      )}
    </>
  );
}
