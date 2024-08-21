'use client';

import Link from 'next/link';

import Rating from '@/app/wordpress-plugin/[slug]/components/RatingAndReviews/Rating';
import { Review } from '@/app/wordpress-plugin/[slug]/components/Review/Review';

import { IPlugin, IReview } from '@/@types/plugin';

import AnalysisIcon from './analysis.svg';

import styles from './ratingAndReviews.module.scss';

export function RatingAndReviews({
  hasMore,
  reviews,
  plugin,
}: {
  reviews: {
    metadata: {
      totalCount: number;
    };
    data: IReview[];
  };
  hasMore: boolean;
  plugin: IPlugin;
}) {
  return (
    <div className={styles.ratingAndReviews}>
      <h2 className={styles.title}>Rating and reviews</h2>
      <div className={styles.content}>
        <Rating reviews={reviews?.metadata?.totalCount} plugin={plugin} />
        <div className={styles.reviews}>
          {plugin?.ratings_user_sentiment_analysis && (
            <div className={styles.analysis}>
              <h3 className={styles.analysisTitle}>
                <AnalysisIcon />
                User sentiment analysis
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: plugin?.ratings_user_sentiment_analysis || '',
                }}
                className={styles.analysisDescription}
              />
            </div>
          )}

          <div className={styles.reviewsWrapper}>
            <div>
              {reviews?.data?.map((eachReview, index) => (
                <Review
                  isLast={index === plugin?.reviews?.length - 1}
                  key={eachReview?.id || ''}
                  review={eachReview}
                />
              ))}
            </div>
            {hasMore && (
              <div className={styles.reviewsActions}>
                <Link
                  href={`/wordpress-plugin/${plugin?.plugin_slug}/reviews`}
                  className={styles.reviewsSeeAll}
                  scroll
                >
                  See All Reviews
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
