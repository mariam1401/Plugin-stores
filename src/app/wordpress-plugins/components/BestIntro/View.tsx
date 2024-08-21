import Link from 'next/link';

import Lightning from './lightning.svg';
import Download from './download.svg';
import Cloud from './cloud.svg';

import styles from './view.module.scss';

export default function View() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Your plugins work the best on 10Web</p>
      <p className={styles.description}>
        Experience unmatched performance, reliability, and security, ensuring
        your website operates at peak efficiency.
      </p>
      <div className={styles.reasons}>
        <div className={styles.reason}>
          <Download />
          <p>
            Install and automatically update WordPress core, plugins, & themes
            in one delightful, easy to use environment.
          </p>
        </div>
        <div className={styles.reason}>
          <Cloud />
          <p>
            Get a Google Cloud partner hosting that improves your website
            performance and helps you rank higher on search engines..
          </p>
        </div>
        <div className={styles.reason}>
          <Lightning />
          <p>
            Boost your site’s speed with advanced caching, a global CDN, and
            dedicated resources that ensure your plugins operate at lightning
            speed..
          </p>
        </div>
      </div>
      <Link
        href="https://10web.io/managed-wordpress-hosting/"
        className={styles.link}
      >
        Discover the Difference
      </Link>
    </div>
  );
}
