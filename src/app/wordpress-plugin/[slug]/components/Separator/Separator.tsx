import styles from './separator.module.scss';

export function Separator({ color }: { color?: string }) {
  return (
    <div
      style={{ background: color ? color : 'black' }}
      className={styles.separator}
    />
  );
}
