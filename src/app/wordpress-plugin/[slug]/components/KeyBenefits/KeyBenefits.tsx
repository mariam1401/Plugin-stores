import { IPlugin } from '@/@types/plugin';

import styles from './keyBenefits.module.scss';

export function KeyBenefits({ plugin }: { plugin: IPlugin }) {
  return (
    <div className={styles.keyBenefits}>
      {(Array.isArray(plugin?.key_benefits) ? plugin.key_benefits : [])?.map(
        (eachBenefit) => (
          <div className={styles.benefit} key={eachBenefit?.name}>
            <h3 className={styles.benefitTitle}>{eachBenefit?.name}</h3>
            <ul className={styles.benefitInfoWrapper}>
              {eachBenefit?.points?.map((item) => (
                <li className={styles.benefitInfo} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ),
      )}
    </div>
  );
}
