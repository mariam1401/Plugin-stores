import Link from 'next/link';

import Lightning from './lightning.svg';
import Security from './security.svg';
import Graph from './graph.svg';
import Speed from './speed.svg';

import styles from './view.module.scss';

export default function View() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Elevate your WordPress experience</p>
      <p className={styles.description}>
        Choose 10Web for hosting that goes beyond the basics. Our top-tier
        WordPress platform is engineered to deliver unparalleled performance,
        security, and scalability, ensuring your website always runs at peak
        efficiency.
      </p>
      <div className={styles.reasons}>
        <div className={styles.reason}>
          <Lightning />
          <div className={styles.texts}>
            <p className={styles.header}>Unmatched performance</p>
            <p className={styles.desc}>
              Experience lightning-fast load times with our state-of-the-art
              caching technology, global CDN, and dedicated resources tailored
              for WordPress.
            </p>
          </div>
        </div>
        <div className={styles.reason}>
          <Security />
          <div className={styles.texts}>
            <p className={styles.header}>Advanced security</p>
            <p className={styles.desc}>
              Keep your site protected with our comprehensive security measures,
              including automatic updates, daily backups, and proactive threat
              detection.
            </p>
          </div>
        </div>
        <div className={styles.reason}>
          <Graph />
          <div className={styles.texts}>
            <p className={styles.header}>Effortless scalability</p>
            <p className={styles.desc}>
              Grow your website with ease. Our hosting solutions adapt to your
              needs, supporting your growth with scalable resources and
              infrastructure.
            </p>
          </div>
        </div>
        <div className={styles.reason}>
          <Speed />
          <div className={styles.texts}>
            <p className={styles.header}>PageSpeed optimization</p>
            <p className={styles.desc}>
              Achieve top Google PageSpeed scores with our built-in optimization
              tools, enhancing user experience and SEO for your WordPress site.
            </p>
          </div>
        </div>
      </div>
      <Link
        href="https://10web.io/managed-wordpress-hosting/"
        className={styles.link}
      >
        Get Started
      </Link>
    </div>
  );
}
