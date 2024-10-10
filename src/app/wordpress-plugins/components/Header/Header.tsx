'use client';

import { PropsWithChildren, FC } from 'react';

import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

import Web10Icon from '@/icons/Web10Icon';

import styles from './Header.module.scss';

const Header: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const middleScreen = useMediaQuery('(max-width:1260px)');
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span
          onClick={() => {
            router.push('/wordpress-plugins/');
          }}
        >
          <Web10Icon />
        </span>
        {children}
        {!middleScreen && (
          <a
            href="https://10web.io/ai-website-builder/"
            className={styles.action}
          >
            Create a Website with AI
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;
