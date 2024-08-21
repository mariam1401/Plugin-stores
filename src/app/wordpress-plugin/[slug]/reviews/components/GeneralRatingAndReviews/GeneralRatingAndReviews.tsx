'use client';

import { useEffect, useState, useRef } from 'react';

import { PaginationItem, useMediaQuery, Pagination } from '@mui/material';

import Rating from '@/app/wordpress-plugin/[slug]/components/RatingAndReviews/Rating';
import { Review } from '@/app/wordpress-plugin/[slug]/components/Review/Review';
import { Sort } from '@/app/wordpress-plugin/[slug]/reviews/components/Sort';

import { useReviewsList } from '@/lib/useReviewsList';
import { IPlugin } from '@/@types/plugin';

import AnalysisIcon from './analysis.svg';
import LeftIcon from './leftIcon.svg';
import Close from './close.svg';

import styles from './ratingAndReviews.module.scss';

const PER_PAGE_REVIEWS = 10;
export function GeneralRatingAndReviews({ plugin }: { plugin: IPlugin }) {
  const ref = useRef<HTMLDivElement>(null);
  const [initialRender, setInitialRender] = useState(false);
  const [isSortedByRating, setIsSortedByRating] = useState(false);
  const [stars, setStars] = useState<number[]>([]);
  const smallScreen = useMediaQuery('(max-width:768px)');
  const [page, setPage] = useState(1);
  const {
    metadata: { totalCount },
    data,
  } = useReviewsList({
    offset: (page - 1) * PER_PAGE_REVIEWS,
    slug: plugin?.plugin_slug,
    stars: stars,
  });

  const pagesCount = Math.ceil(totalCount / PER_PAGE_REVIEWS);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setIsSortedByRating(false);
    setPage(value);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSorting = () => {
    setIsSortedByRating(!isSortedByRating);
  };
  const handleStars = (value: number) => {
    const index = stars?.findIndex((el) => el === value);
    if (String(index) && index !== -1) {
      let newArray = stars?.filter((e, i) => i !== index);
      setStars(newArray);
    } else {
      setStars([...stars, value]);
    }
    setPage(1);
  };
  const resetStars = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setStars([]);
  };

  useEffect(() => {
    setInitialRender(true);
  }, []);

  return (
    <div className={styles.ratingAndReviews}>
      <h3 className={styles.title}>Rating and reviews</h3>
      <div className={styles.content}>
        <Rating reviews={totalCount} plugin={plugin} />
        <div className={styles.reviews}>
          <div className={styles.analysis}>
            <p className={styles.analysisTitle}>
              <AnalysisIcon />
              User sentiment analysis
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: plugin?.ratings_user_sentiment_analysis || '',
              }}
              className={styles.analysisDescription}
            />
          </div>
          <div className={styles.sort_ctn}>
            <div className={styles.ctn}>
              <button className={styles.sort} onClick={handleSorting}>
                <LeftIcon />
                Sort by rating
                {stars?.length > 0 && (
                  <div className={styles.quantity}>
                    <span>{stars.length}</span>
                    <div className={styles.line}></div>
                    <div onClick={resetStars}>
                      <Close />
                    </div>
                  </div>
                )}
              </button>

              {isSortedByRating && (
                <Sort
                  handleStars={handleStars}
                  open={isSortedByRating}
                  close={handleSorting}
                  stars={stars}
                />
              )}
            </div>
          </div>

          <div className={styles.itemsWrapper} ref={ref}>
            {data &&
              data?.map((eachReview) => (
                <Review review={eachReview} key={eachReview.id} />
              ))}
          </div>
          {initialRender && pagesCount > 1 && (
            <div className={styles.pagination}>
              <Pagination
                renderItem={(item) => (
                  <PaginationItem
                    classes={{
                      colorPrimary: styles.selectedPage,
                      selected: styles.selectedPage,
                    }}
                    {...item}
                  />
                )}
                sx={{
                  '& .MuiPaginationItem-previousNext': {
                    border: '1px solid #cfcfcf',
                  },
                }}
                size={smallScreen ? 'small' : 'medium'}
                onChange={handlePageChange}
                count={pagesCount}
                page={page}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
