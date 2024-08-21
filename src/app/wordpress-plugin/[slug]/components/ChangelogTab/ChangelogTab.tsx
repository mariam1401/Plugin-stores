import { IPlugin } from '@/@types/plugin';

import styles from './changelogTab.module.scss';

export function ChangelogTab({ plugin }: { plugin: IPlugin }) {
  if (!plugin.changelog?.length) {
    return <div></div>;
  }

  return (
    <div className={styles.changelog}>
      <div>
        <h2 className={styles.title}>Updates timeline</h2>
      </div>
      <div className={styles.items}>
        {plugin.changelog?.map((eachChange) => (
          <div key={eachChange?.version} className={styles.item}>
            <div className={styles.version}>{eachChange?.version}</div>
            <div className={styles.changes}>
              <ul className={styles.itemDescription}>
                {eachChange?.changes?.split('\n')?.map((el) => {
                  const data = el?.trim();
                  if (data) {
                    return <li key={el}>{el}</li>;
                  }
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
