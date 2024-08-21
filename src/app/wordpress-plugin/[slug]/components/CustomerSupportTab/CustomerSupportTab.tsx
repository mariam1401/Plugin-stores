import { IPlugin } from '@/@types/plugin';

import LinkIcon from './link.svg';

import styles from './customerSupportTab.module.scss';

export function CustomerSupportTab({ plugin }: { plugin: IPlugin }) {
  return (
    <div className={styles.customerSupport}>
      {plugin?.types_of_support_provided?.summary && (
        <div>
          <h2 className={styles.title}>Customer support</h2>
          <div className={styles.subtitle}>
            <p>
              <span>Types of support provided: </span>
              {plugin?.types_of_support_provided?.types?.join(', ')}
            </p>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: plugin?.types_of_support_provided?.summary || '',
            }}
            className={styles.description}
          />
        </div>
      )}
      {plugin?.learning_resources && (
        <div>
          <h2 className={styles.title}>Learning resources</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: plugin?.learning_resources || '',
            }}
            className={styles.description}
          />
          {((plugin?.link_to_learning_resources &&
            !Array.isArray(plugin?.link_to_learning_resources)) ||
            (Array.isArray(plugin?.link_to_learning_resources) &&
              plugin.link_to_learning_resources[0])) && (
            <a
              href={
                Array.isArray(plugin?.link_to_learning_resources)
                  ? plugin?.link_to_learning_resources[0]
                  : plugin?.link_to_learning_resources
              }
              className={styles.link}
              target="_blank"
            >
              Go to learning resources
              <LinkIcon />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
