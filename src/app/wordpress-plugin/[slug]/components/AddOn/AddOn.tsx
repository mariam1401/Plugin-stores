import classNames from 'classnames';
import Link from 'next/link';

import Download from './download.svg';
import Star from './star.svg';
import Dot from './dot.svg';

import styles from './addOn.module.scss';

interface IAddOnProps {
  withActiveInstallations?: boolean;
  category_name?: string | null;
  active_installations?: number;
  isBlackTheme?: boolean;
  shortTitle?: string;
  downloads?: number;
  className?: string;
  rating?: number;
  image?: string;
  slug?: string;
  name?: string;
}

export function AddOn({
  withActiveInstallations,
  active_installations,
  category_name,
  isBlackTheme,
  shortTitle,
  downloads,
  className,
  rating,
  image,
  slug,
  name,
}: IAddOnProps) {
  return (
    <Link
      className={classNames(styles.addOn, className, {
        [styles.isBlackTheme]: isBlackTheme,
      })}
      href={`/wordpress-plugin/${slug}`}
      scroll
    >
      <img className={styles.logo} src={image || ''} alt={name} />
      <div
        className={classNames(styles.infoContainer, {
          [styles.isBlackTheme]: isBlackTheme,
        })}
      >
        <h3
          className={classNames(styles.name, styles.twoLineEllipsis)}
          dangerouslySetInnerHTML={{ __html: name || '' }}
        />
        <div className={styles.info}>
          <p className={styles.rating}>
            <Star />
            {rating || 0}
          </p>
          <Dot />
          {!withActiveInstallations && (
            <>
              <p className={styles.downloads}>
                <Download />
                {Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 1,
                  notation: 'compact',
                }).format(downloads ?? active_installations ?? 0)}
              </p>
              <Dot />
            </>
          )}
          <p className={styles.category}>{category_name || ''}</p>
        </div>
        {shortTitle && (
          <div
            className={classNames(styles.shortTitle, styles.twoLineEllipsis, {
              [styles.isBlackTheme]: isBlackTheme,
            })}
            dangerouslySetInnerHTML={{ __html: shortTitle || '' }}
          />
        )}
        {withActiveInstallations && (
          <div className={classNames(styles.activeInstallations)}>
            <span className={styles.text}>Active installations</span> <Dot />
            <span>
              <Download />
              {Intl.NumberFormat('en-US', {
                maximumFractionDigits: 1,
                notation: 'compact',
              })?.format(active_installations ?? 0)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
