'use client';

import { PropsWithChildren, useEffect, useRef, FC } from 'react';

import styles from './withBlackBackground.module.scss';

export const WithBlackBackground: FC<PropsWithChildren<{ color?: string }>> = ({
  children,
  color,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateOffset() {
      if (containerRef.current && backgroundRef.current) {
        backgroundRef.current.style.left = `-${containerRef.current.offsetLeft}px`;
      }
    }

    updateOffset();

    window.addEventListener('resize', updateOffset);

    return () => {
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {children}
      <div
        style={{ background: color || 'black' }}
        className={styles.blackBackground}
        ref={backgroundRef}
      />
    </div>
  );
};
