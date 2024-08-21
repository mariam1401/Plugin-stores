import { IPlugin } from '@/@types/plugin';

import Check from './check.svg';

import styles from './mainBenefits.module.scss';

export function MainBenefits({ plugin }: { plugin: IPlugin }) {
  const benefits =
    typeof plugin?.main_benefits === 'string'
      ? JSON.parse(plugin?.main_benefits || '')
      : plugin?.main_benefits;

  if (!benefits) {
    return <div></div>;
  }
  return (
    <div className={styles.mainBenefits}>
      <h4 className={styles.title}>Main benefits</h4>
      <div className={styles.items}>
        {Array.isArray(benefits) &&
          benefits?.map((eachItem: any) => (
            <div className={styles.item} key={eachItem}>
              <Check />
              <p className={styles.info}>
                {typeof eachItem === 'string' ? eachItem : ''}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
