'use client';

import { useEffect, useState } from 'react';

import ImageViewer from 'react-simple-image-viewer';
import { useMediaQuery } from '@mui/material';
import classNames from 'classnames';

import { IScreenshot, IPlugin } from '@/@types/plugin';

import Play from './play.svg';

import styles from './imageViewer.module.scss';

const basePath = 'https://storage.googleapis.com/pluginstore-plugins-images/';

const getImgUrl = (item: IScreenshot | undefined | string): string => {
  if (typeof item === 'string') {
    const videoId = item.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})/)?.[1];
    const thumbnailUrl = videoId
      ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      : '';

    return thumbnailUrl;
  }
  return item?.screenshot_url as string;
};
export default function ImagePreviewSection({ plugin }: { plugin: IPlugin }) {
  const [rendered, setRendered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images: (IScreenshot | undefined | string)[] = [];
  const middleScreen = useMediaQuery('(max-width:1260px)');

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
  function convertToEmbedUrl(youtubeUrl: any) {
    if (
      youtubeUrl &&
      typeof youtubeUrl === 'string' &&
      youtubeUrl?.includes('https://www.youtube.com/')
    ) {
      if (youtubeUrl?.includes('youtube.com/embed/')) {
        return youtubeUrl;
      }
      const videoId = youtubeUrl?.split('v=')[1];
      const ampersandPosition = videoId?.indexOf('&');
      if (ampersandPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId?.substring(0, ampersandPosition)}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return youtubeUrl;
    }
  }

  useEffect(() => {
    if (isViewerOpen) {
      const imgElement = document.querySelector(
          '.react-simple-image-viewer__slide img'
      );
      if (imgElement) {
        imgElement.setAttribute(
            'alt',
            plugin?.plugin_name || ''
        );
      }
    }
  }, [isViewerOpen, currentImage, plugin]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.preview]: isViewerOpen,
      })}
    >
      {typeof images[currentImage] === 'string' ? (
        rendered && (
          <iframe src={convertToEmbedUrl(images[currentImage]) as string}/>
        )
      ) : images[currentImage] ? (
        <img
          src={(images[currentImage] as IScreenshot)?.screenshot_url!}
          alt={plugin?.plugin_name || ''}
        />
      ) : null}
      {!middleScreen && !!images?.length && (
        <div className={styles.imgsColumn}>
          {images?.map((eachImage, index) =>
            index < 4 ? (
                <div
                    style={{position: 'relative'}}
                    onClick={() => {
                      setCurrentImage(index);
                    }}
                    className={styles.eachImage}
                    key={getImgUrl(eachImage)}
                >
                  <img
                      src={getImgUrl(eachImage)}
                      alt={plugin?.plugin_name || ''}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                  />
                  {typeof eachImage === 'string' && (
                      <Play
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                      />
                  )}
                </div>

            ) : null,
          )}

          {images?.length > 4 && (
            <div
              onClick={() => {
                setIsViewerOpen(true);
              }}
              className={styles.moreItems}
            >
              <div className={styles.moreItemsCount}>+{images?.length - 4}</div>
            </div>
          )}
        </div>
      )}
      {isViewerOpen && (
        <ImageViewer
          src={plugin?.screenshots?.map(
            (eachImage) => basePath + eachImage?.screenshot_url,
          )}
          onClose={() => {
            setCurrentImage(0);
            setIsViewerOpen(false);
          }}
          currentIndex={currentImage}
          closeOnClickOutside={true}
          disableScroll={false}
        />
      )}
    </div>
  );
}
