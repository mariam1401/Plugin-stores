import { Tooltip } from '@/app/wordpress-plugin/[slug]/components/Tooltip/Tooltip';

import { IPlugin } from '@/@types/plugin';

import styles from './compatibilityTab.module.scss';

export function CompatibilityTab({ plugin }: { plugin: IPlugin }) {
  if (
    !plugin?.plugin_compatibilities?.length &&
    !plugin?.external_integration_capabilities?.descriptions &&
    !plugin?.external_integration_capabilities?.summary
  ) {
    return <div></div>;
  }

  return (
    <div className={styles.compatibility}>
      <h2 className={styles.title}>Compatibility</h2>

      {plugin?.plugin_compatibilities?.length > 0 && (
        <div>
          <h3 className={styles.subtitle}>Plugin compatibilities:</h3>
          <p className={styles.compatibilitiesList}>
            {plugin?.plugin_compatibilities?.slice(0, 5)?.join(', ')}...{' '}
            {plugin?.plugin_compatibilities?.length > 5 && (
              <span id="compatibilityTooltip" className={styles.bold}>
                [+{plugin?.plugin_compatibilities?.length - 5}]
              </span>
            )}
          </p>
          <Tooltip anchorSelect="#compatibilityTooltip">
            {plugin?.plugin_compatibilities
              ?.slice(4, plugin?.plugin_compatibilities.length)
              ?.join(', ')}
          </Tooltip>
        </div>
      )}

      {plugin?.external_integration_capabilities?.descriptions && (
        <div>
          <h3 className={styles.subtitle}>
            External Integration Capabilities:
          </h3>
          {plugin?.external_integration_capabilities?.summary && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  plugin?.external_integration_capabilities?.summary || '',
              }}
              className={styles.summary}
            />
          )}
          <ul className={styles.ul}>
            {plugin?.external_integration_capabilities?.descriptions?.map(
              (el) => {
                return <li key={Math.random()}>{el}</li>;
              },
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
