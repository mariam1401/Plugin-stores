import { IPricing, IPlugin } from '@/@types/plugin';

import CheckIcon from './checkIcon.svg';

import styles from '../PriceList/view.module.scss';

export function PriceOption({
  length,
  plugin,
  data,
}: {
  plugin?: IPlugin;
  length?: number;
  data: IPricing;
}) {
  const features = data?.features || [];
  let chunks;
  if (length === 1) {
    const chunkSize = Math.ceil(features?.length / 3);
    chunks = Array.from({ length: 3 }, (_, i) =>
      features?.slice(i * chunkSize, (i + 1) * chunkSize),
    );
  }
  return (
    <div className={styles.item}>
      <div className={styles.header_ctn}>
        <span className={styles.price_name}>{data?.name} </span>
        <div className={styles.price_ctn}>
          <h3>${data?.price}</h3> <span>/ {data?.billing_cycle}</span>
        </div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.features_ctn}>
        <div className={styles.ctn}>
          <h4>Plan includes</h4>
          <div className={styles.option}>
            {length === 1
              ? chunks?.map((chunk, columnIndex) => (
                  <div style={{ flex: 1 }} key={columnIndex}>
                    {chunk.map((item: { feature_name?: string }, index) => (
                      <div className={styles.feature} key={index}>
                        <div>
                          <CheckIcon />
                        </div>
                        <span>{item?.feature_name}</span>
                      </div>
                    ))}
                  </div>
                ))
              : data?.features?.map(
                  (item: { feature_name?: string }, index) => {
                    return (
                      <div className={styles.feature} key={index}>
                        <div>
                          <CheckIcon />
                        </div>
                        <span>{item?.feature_name}</span>
                      </div>
                    );
                  },
                )}
          </div>
        </div>
        {plugin?.price_page && (
          <a
            className={styles.buy_btn}
            href={plugin.price_page}
            target={'_blank'}
          >
            Buy Now
          </a>
        )}
      </div>
    </div>
  );
}
