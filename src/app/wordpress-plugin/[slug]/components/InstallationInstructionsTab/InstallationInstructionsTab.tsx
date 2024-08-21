import { IPlugin } from '@/@types/plugin';

import styles from './installationInstructionsTab.module.scss';

export function InstallationInstructionsTab({ plugin }: { plugin: IPlugin }) {
  if (!plugin?.installation_instructions) {
    return <div></div>;
  }
  return (
    <div className={styles.instructions}>
      <div className={styles.main}>
        <h2 className={styles.mainTitle}>Installation</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: plugin?.installation_instructions || '',
          }}
          className={styles.mainDescription}
        />
      </div>
    </div>
  );
}
