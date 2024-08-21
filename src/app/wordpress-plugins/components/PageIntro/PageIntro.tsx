'use client';
import { useMediaQuery } from '@mui/material';

import styles from './pageIntro.module.scss';

export const PageIntro = () => {
  const smallScreen = useMediaQuery('(max-width:768px)');
  return (
    <div className={styles.container}>
      <div className={styles.introTextContainer}>
        <h1 className={styles.intro}>
          Find the perfect plugins to elevate your{' '}
          <span className={styles.link}>WordPress</span> site
        </h1>
        <p className={styles.subIntro}>
          Effortlessly discover top-rated plugins tailored to enhance your site,
          all in one place.
        </p>
      </div>
      {!smallScreen && <img src={'/introImage.png'} />}
    </div>
  );
};
