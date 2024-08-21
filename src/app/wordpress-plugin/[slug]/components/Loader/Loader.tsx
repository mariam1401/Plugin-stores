import classNames from 'classnames';

import styles from './loader.module.scss';

export function Loader({ className }: { className?: string }) {
  return <div className={classNames(styles.loader, className)} />;
}
