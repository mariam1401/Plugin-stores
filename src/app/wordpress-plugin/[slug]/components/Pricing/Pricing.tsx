import classNames from 'classnames';

import { IPlugin } from '@/@types/plugin';

import CheckIcon from '../../checkIcon.svg';
import Link from './link.svg';

import styles from './pricing.module.scss';

interface IOptionProps {
  billing_cycle: string;
  items: string[];
  plugin: IPlugin;
  price: number;
  name: string;
  value?: string;
}

function Option({ billing_cycle, plugin, items, price, name }: IOptionProps) {
  return (
    <div className={styles.option}>
      <div className={styles.header}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>
          ${price}
          <span> / {billing_cycle}</span>
        </p>
      </div>
      <h3>Plan includes</h3>
      <div className={styles.ctn}>
        <div className={styles.info}>
          {items?.splice(0, 8)?.map((item, index) => (
            <div key={index}>
              <CheckIcon />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <a
          href={plugin.price_page || ''}
          className={styles.buy_btn}
          target={'_blank'}
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}

export function Pricing({ plugin }: { plugin: IPlugin }) {
  if (!plugin?.price_list?.length) {
    return <div></div>;
  }

  const prices = (plugin?.price_list || [])
    ?.filter(
      (eachItem) =>
        eachItem?.price !== null &&
        (typeof eachItem?.features?.[0] === 'string' ||
          typeof eachItem?.features?.[0]?.feature_name === 'string'),
    )
    ?.sort((a, b) => a?.price - b?.price);

  if (!prices?.length) {
    return <div></div>;
  }

  return (
    <div className={classNames(styles.pricing, 'notFsound')}>
      <div className={styles.select}>
        <h2 className={styles.title}>Pricing</h2>
      </div>
      <div className={styles.options}>
        {prices[0] && (
          <Option
            items={prices[0]?.features?.map((a) =>
              typeof a === 'string' ? a : a?.feature_name || '',
            )}
            billing_cycle={prices[0].billing_cycle}
            price={prices[0].price}
            name={prices[0].name}
            key={prices[0].name}
            plugin={plugin}
          />
        )}

        {prices?.length > 1 && (
          <Option
            items={prices[prices?.length - 1]?.features?.map((a) =>
              typeof a === 'string' ? a : a?.feature_name || '',
            )}
            billing_cycle={prices[prices.length - 1].billing_cycle}
            price={prices[prices.length - 1].price}
            name={prices[prices.length - 1].name}
            key={prices[prices.length - 1].name}
            plugin={plugin}
          />
        )}
      </div>

      <p className={styles.hint}>
        In some cases companies have different prices based on various
        components like a location. As a result the prices displayed here can
        differ from the ones you see on their websites.
      </p>
      <a
        href={plugin?.price_page || ''}
        className={styles.link}
        target="_blank"
      >
        See all pricing options <Link />
      </a>
      {prices?.length > 2 && (
        <div className={styles.overlay}>
          <a href={`/wordpress-plugin/${plugin?.plugin_slug}/pricing`}>
            Find Your Price Plan
          </a>
        </div>
      )}
    </div>
  );
}
