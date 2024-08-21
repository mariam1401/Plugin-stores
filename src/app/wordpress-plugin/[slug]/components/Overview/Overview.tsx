import styles from './overview.module.scss';

export function Overview({ content }: { content: undefined | string }) {
  return (
    <div className={styles.introduction}>
      <h2 className={styles.title}>Overview</h2>
      <div
        dangerouslySetInnerHTML={{ __html: content || '' }}
        className={styles.description}
      />
    </div>
  );
}
