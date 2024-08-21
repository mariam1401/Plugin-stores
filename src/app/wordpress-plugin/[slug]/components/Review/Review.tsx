import { useEffect, useState, useRef } from 'react';

import { useMediaQuery } from '@mui/material';
import { format, parse } from 'date-fns';
import classNames from 'classnames';
import Image from 'next/image';

import { Loader } from '@/app/wordpress-plugin/[slug]/components/Loader/Loader';

import { IReview } from '@/@types/plugin';

import RatingStarFilledIcon from './rating-star-filled.svg';
import RatingStarIcon from './rating-star.svg';
import img from './img.png';

import styles from './review.module.scss';

export function Review({
  review,
  isLast,
}: {
  isLast?: boolean;
  review: IReview;
}) {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [isMoreShown, setIsMoreShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const smallScreen = useMediaQuery('(max-width:768px)');
  const middleScreen = useMediaQuery('(max-width:1260px)');

  const ref = useRef<HTMLParagraphElement | null>(null);
  const rating = Math.floor(review?.rating || 0);

  const startDate = parse(
    review?.created_at!,
    "yyyy-MM-dd'T'HH:mm:ss.SSSX",
    new Date(),
  );
  const formattedStartDate = format(startDate, 'dd MMM, yyyy');

  useEffect(() => {
    if (ref.current?.clientHeight && ref.current.clientHeight > 136) {
      setShowMoreButton(true);
    }
    setIsLoading(false);
  }, []);
  return (
    <div className={styles.review}>
      <div className={styles.reviewHeader}>
        {review?.profile_url ? (
          <img
            className={styles.reviewerAvatar}
            alt={review?.author || ''}
            src={review?.profile_url}
          />
        ) : (
          <Image
            className={classNames(styles.reviewerAvatar)}
            alt="Bruce Wayne"
            src={img}
          />
        )}

        <div className={styles.reviewer}>
          <p className={styles.reviewerName}>{review?.author}</p>
          <div className={styles.reviewInfo}>
            <div className={styles.reviewStars}>
              {1 <= rating ? <RatingStarFilledIcon /> : <RatingStarIcon />}
              {2 <= rating ? <RatingStarFilledIcon /> : <RatingStarIcon />}
              {3 <= rating ? <RatingStarFilledIcon /> : <RatingStarIcon />}
              {4 <= rating ? <RatingStarFilledIcon /> : <RatingStarIcon />}
              {5 <= rating ? <RatingStarFilledIcon /> : <RatingStarIcon />}
            </div>
            <p className={styles.reviewDate}>{formattedStartDate}</p>
          </div>
        </div>
      </div>
      <div className={styles.reviewDescriptionBlock}>
        {isLoading && (
          <div className={styles.overlayLoading}>
            <Loader />
          </div>
        )}
        <div
          style={{
            maxHeight: isMoreShown ? ref.current?.clientHeight : undefined,
          }}
          className={styles.reviewDescriptionWrapper}
        >
          <div className={styles.reviewDescription} ref={ref}>
            {isLast
              ? review?.review?.slice(
                  0,
                  smallScreen ? 40 : middleScreen ? 120 : 55,
                )
              : review?.review}
          </div>
        </div>
        {showMoreButton && (
          <button
            onClick={() => setIsMoreShown((prevState) => !prevState)}
            className={styles.reviewShowMore}
          >
            {isMoreShown ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
}
