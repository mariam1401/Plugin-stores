'use client';
import { useEffect, useState, useRef } from 'react';

//@ts-ignore
import { SplideSlide, SplideTrack, Splide } from '@splidejs/react-splide';
import { IoIosArrowForward } from 'react-icons/io';
import { IoChevronBack } from 'react-icons/io5';
import { useMediaQuery } from '@mui/material';

import '@splidejs/react-splide/css/core';

import { PriceOption } from '@/app/wordpress-plugin/[slug]/pricing/components/PriceOption/PriceOption';

import { IPlugin } from '@/@types/plugin';

import PlansIcon from './plansIcon.svg';

import styles from './view.module.scss';
export function PriceList({ plugin }: { plugin: IPlugin }) {
  const middleScreen = useMediaQuery('(max-width:1024px)');
  const smallScreen = useMediaQuery('(max-width:768px)');
  const [currentIndex, setCurrentIndex] = useState(4);
  const [activeIndex, setActiveIndex] = useState(0);
  const [next, setNext] = useState<boolean>();
  const [back, setBack] = useState<boolean>();
  const splideRef = useRef(null);
  const nextRef = useRef(null);
  const backRef = useRef(null);
  const filteredPriceList = plugin?.price_list?.filter(
    (eachItem) =>
      eachItem?.price !== null &&
      (typeof eachItem?.features?.[0] === 'string' ||
        typeof eachItem?.features?.[0]?.feature_name === 'string'),
  );
  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const handleBack = () => {
    setCurrentIndex(currentIndex - 1);
  };
  useEffect(() => {
    setCurrentIndex(4);
  }, [middleScreen, smallScreen]);

  useEffect(() => {
    if (backRef?.current && nextRef?.current) {
      //@ts-ignore
      setBack(backRef?.current?.disabled);
      //@ts-ignore
      setNext(nextRef?.current?.disabled);
    }
  }, [currentIndex]);
  const handleButtonClick = (pageIndex: number, index: number) => {
    if (splideRef?.current) {
      setActiveIndex(index);
      //@ts-ignore
      splideRef?.current?.splide?.go(pageIndex);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Explore pricing options for{' '}
        <span style={{ color: '#3339F1' }}>
          {' '}
          <span
            dangerouslySetInnerHTML={{ __html: plugin?.plugin_name || '' }}
          />{' '}
        </span>{' '}
        and discover the perfect plan for you
      </h2>
      <div className={styles.list}>
        {middleScreen ? (
          <div className={styles.types_ctn}>
            <div className={styles.btns}>
              {filteredPriceList?.map((el, index) => {
                return (
                  <button
                    style={{
                      borderBottom:
                        index === activeIndex ? '2px solid black' : 'none',
                      color: index === activeIndex ? 'black' : '#00000080',
                    }}
                    onClick={() =>
                      handleButtonClick(smallScreen ? index : index - 1, index)
                    }
                    key={index}
                  >
                    {el?.name}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            className={
              filteredPriceList?.length > 4
                ? styles.title_ctn_slide
                : styles.title_ctn
            }
          >
            <PlansIcon />
            <span>All plans</span>
          </div>
        )}

        {!(filteredPriceList?.length > 4) && !middleScreen ? (
          <div
            style={{
              gridTemplateColumns:
                filteredPriceList?.length >= 4
                  ? 'repeat(4,1fr)'
                  : `repeat(${filteredPriceList?.length},1fr)`,
            }}
            className={styles.price_list}
          >
            {filteredPriceList?.map((el, index) => {
              return (
                <div key={index}>
                  <PriceOption
                    length={filteredPriceList?.length || 0}
                    plugin={plugin}
                    data={el}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <Splide
            options={{
              padding: {
                right: middleScreen ? '20%' : '0',
              },
              perPage: smallScreen ? 1 : middleScreen ? 2 : 4,
              gap: smallScreen ? '16px' : '20px',
              pagination: false,
              easing: 'linear',
              width: '100%',
              drag: 'free',
            }}
            aria-label="My Favorite Images"
            hasTrack={false}
            ref={splideRef}
          >
            <div className={`splide__arrows ${styles.arrows}`}>
              <button
                className="splide__arrow splide__arrow--prev"
                onClick={handleBack}
                ref={backRef}
              >
                <IoChevronBack color={!back ? 'black' : '#e7e7e7'} />
              </button>
              <button
                className={`splide__arrow splide__arrow--next `}
                onClick={handleNext}
                ref={nextRef}
              >
                <IoIosArrowForward color={!next ? 'black' : '#e7e7e7'} />
              </button>
            </div>
            <SplideTrack>
              {filteredPriceList?.map((el: any, i) => {
                return (
                  <SplideSlide key={i}>
                    <PriceOption
                      length={filteredPriceList?.length || 0}
                      plugin={plugin}
                      data={el}
                    />
                  </SplideSlide>
                );
              })}
            </SplideTrack>
            {!back && <div className={styles.back}></div>}
            {!next && <div className={styles.next}></div>}
          </Splide>
        )}

        <div className={styles.info}>
          In some cases companies have different prices based on various{' '}
          components like a location. As a result the prices displayed here can{' '}
          differ from the ones you see on their websites.
        </div>
      </div>
    </div>
  );
}
