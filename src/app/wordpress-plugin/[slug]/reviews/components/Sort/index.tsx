import { FC } from 'react';

import useOutsideClick from '@/lib/useOutsideClick';

import Star from './star.svg';

import styles from './index.module.scss';

type dataTypes = {
  close: () => void;
  handleStars: any;
  stars: number[];
  open: boolean;
};
export const Sort: FC<dataTypes> = ({ handleStars, stars, close, open }) => {
  const ref = useOutsideClick<HTMLDivElement>(close, open);

  return (
    <div className={styles.ctn} ref={ref}>
      {Array.from({ length: 5 }, (_, i) => {
        let checked = stars?.includes(i + 1);
        return (
          <div key={i}>
            <input
              onChange={() => handleStars(i + 1)}
              checked={checked}
              type={'checkbox'}
            />
            <span>
              {i + 1} <Star />
            </span>
          </div>
        );
      })}
    </div>
  );
};
