'use client';
import { useEffect, useState, useRef } from 'react';

//@ts-ignore
import { SplideSlide, SplideTrack, Splide } from '@splidejs/react-splide';
import { IoIosArrowForward } from 'react-icons/io';
import { IoChevronBack } from 'react-icons/io5';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

import '@splidejs/react-splide/css/core';

import { IPlugin } from '@/@types/plugin';

import { AddOn } from '../AddOn/AddOn';
import Arrow from './arrow.svg';

import styles from './addOns.module.scss';

interface IProps {
  title: string;
  morePlugins?: IPlugin['more_plugins_like_this'];
}

export function AddOns({ morePlugins, title }: IProps) {
  const router = useRouter();
  const middleScreen = useMediaQuery('(max-width:1260px)');
  const smallScreen = useMediaQuery('(max-width:768px)');
  const [currentIndex, setCurrentIndex] = useState(3);
  const [next, setNext] = useState<boolean>();
  const [back, setBack] = useState<boolean>();
  const splideRef = useRef(null);
  const nextRef = useRef(null);
  const backRef = useRef(null);
  const redirectToCategoryPage = () => {
    router.push('alternatives/');
  };
  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const handleBack = () => {
    setCurrentIndex(currentIndex - 1);
  };
  useEffect(() => {
    if (smallScreen) {
      setCurrentIndex(1);
    } else if (middleScreen) {
      setCurrentIndex(2);
    }
  }, [smallScreen]);

  useEffect(() => {
    if (backRef.current && nextRef.current) {
      //@ts-ignore
      setBack(backRef.current.disabled);
      //@ts-ignore
      setNext(nextRef.current.disabled);
    }
  }, [currentIndex]);

  return (
    <div className={styles.addOns}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {/*  @ts-ignore*/}
        {!!morePlugins?.data?.length &&
          //@ts-ignore
          morePlugins?.metadata?.totalCount > 3 && (
            <a href={'alternatives/'} className={styles.seeAll}>
              See all <Arrow />
            </a>
          )}
      </div>
      <div>
        <Splide
          options={{
            padding: {
              right: middleScreen ? '20%' : '0',
            },
            perPage: smallScreen ? 1 : middleScreen ? 2 : 3,
            gap: smallScreen ? '16px' : '20px',
            pagination: false,
            easing: 'linear',
            width: '100%',
            drag: false,
          }}
          aria-label="My Favorite Images"
          hasTrack={false}
          ref={splideRef}
        >
          <div
            style={{
              justifyContent:
                back && !next
                  ? 'end'
                  : !back && next
                    ? 'start'
                    : 'space-between',
            }}
            className={`splide__arrows ${styles.arrows}`}
          >
            <button
              className="splide__arrow splide__arrow--prev"
              style={{ display: back ? 'none' : 'flex' }}
              onClick={handleBack}
              ref={backRef}
            >
              <IoChevronBack color={!back ? 'black' : '#e7e7e7'} />
            </button>

            <button
              className={`splide__arrow splide__arrow--next `}
              style={{ display: next ? 'none' : 'flex' }}
              onClick={handleNext}
              ref={nextRef}
            >
              <IoIosArrowForward color={!next ? 'black' : '#e7e7e7'} />
            </button>
          </div>
          <SplideTrack>
            {morePlugins?.data?.map((eachPlugin: any, i) => {
              return (
                <SplideSlide key={i}>
                  <AddOn
                    downloads={eachPlugin?.active_installations}
                    category_name={eachPlugin?.category_name}
                    slug={eachPlugin?.plugin_slug}
                    name={eachPlugin?.plugin_name}
                    rating={eachPlugin?.rating}
                    key={eachPlugin?.plugin_id}
                    image={eachPlugin?.logo ? eachPlugin?.logo : 'https://plugin-store-assets.s3.amazonaws.com/icon.png'}
                  />
                </SplideSlide>
              );
            })}
          </SplideTrack>
          {!back && <div className={styles.back}></div>}
          {!next && <div className={styles.next}></div>}
        </Splide>
      </div>
    </div>
  );
}
