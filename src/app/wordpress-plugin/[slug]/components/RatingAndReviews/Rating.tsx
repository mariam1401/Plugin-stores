import styles from '@/app/wordpress-plugin/[slug]/components/RatingAndReviews/ratingAndReviews.module.scss';
import InstallationIcon from '@/app/wordpress-plugin/[slug]/components/RatingAndReviews/installation.svg';
import CommentIcon from '@/app/wordpress-plugin/[slug]/components/RatingAndReviews/comment.svg';
import StarIcon from '@/app/wordpress-plugin/[slug]/components/RatingAndReviews/star.svg';

import { calculateRatingSummary } from '@/lib/getAverageRating';
import { IPlugin } from '@/@types/plugin';

export default function Rating({
  reviews,
  plugin,
}: {
  reviews?: number;
  plugin: IPlugin;
}) {
  const ratings = calculateRatingSummary(plugin?.rating_by_stars);

  if (!ratings?.averageRating) {
    return <div></div>;
  }

  return (
    <div className={styles.rating}>
      <div className={styles.ratingItems}>
        <div className={styles.ratingItem}>
          <div className={styles.ratingValue}>
            <StarIcon />
            {ratings?.averageRating}
          </div>
          <p className={styles.ratingName}>Rating summary</p>
        </div>
        <div className={styles.ratingItem}>
          <div className={styles.ratingValue}>
            <CommentIcon />
            {reviews ?? 0}
          </div>
          <p className={styles.ratingName}>Reviews</p>
        </div>
        <div className={styles.ratingItem}>
          <div className={styles.ratingValue}>
            <InstallationIcon />
            {Intl.NumberFormat('en-US', {
              maximumFractionDigits: 1,
              notation: 'compact',
            }).format(plugin?.active_installations ?? 0)}
          </div>
          <p className={styles.ratingName}>Active installations</p>
        </div>
      </div>
      <div className={styles.rates}>
        <div className={styles.rate}>
          5
          <div className={styles.rateDefault}>
            <div
              style={{ width: `${ratings?.ratingPercentages['5']}%` }}
              className={styles.rateFilled}
            />
          </div>
        </div>
        <div className={styles.rate}>
          4
          <div className={styles.rateDefault}>
            <div
              style={{ width: `${ratings?.ratingPercentages['4']}%` }}
              className={styles.rateFilled}
            />
          </div>
        </div>
        <div className={styles.rate}>
          3
          <div className={styles.rateDefault}>
            <div
              style={{ width: `${ratings?.ratingPercentages['3']}%` }}
              className={styles.rateFilled}
            />
          </div>
        </div>
        <div className={styles.rate}>
          2
          <div className={styles.rateDefault}>
            <div
              style={{ width: `${ratings?.ratingPercentages['2']}%` }}
              className={styles.rateFilled}
            />
          </div>
        </div>
        <div className={styles.rate}>
          1
          <div className={styles.rateDefault}>
            <div
              style={{ width: `${ratings?.ratingPercentages['1']}%` }}
              className={styles.rateFilled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
