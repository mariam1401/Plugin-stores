import { Fragment } from 'react';

import { useMediaQuery } from '@mui/material';
import classNames from 'classnames';

import { IPlugin } from '@/@types/plugin';

import CheckMArk from './checkMark.svg';
import Diamond from './diamond.svg';
import XMArk from './xMark.svg';

import styles from './featuresList.module.scss';

export function FeaturesList({ plugin }: { plugin: IPlugin }) {
  if (!plugin?.price_list?.length) {
    return <div></div>;
  }

  // TODO: remove when api will be fixed
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const smallScreen = useMediaQuery('(max-width:768px)');
  const sortedList = plugin?.price_list
    ?.filter(
      (eachItem) =>
        eachItem?.price !== null &&
        (typeof eachItem?.features?.[0] === 'string' ||
          typeof eachItem?.features?.[0]?.feature_name === 'string'),
    )
    ?.map((eachItem) => ({
      ...eachItem,
      features: eachItem?.features?.map((feature) => ({
        feature_name:
          typeof feature === 'string' ? feature : feature?.feature_name,
        description: typeof feature === 'string' ? '' : feature?.description,
      })),
    }))
    ?.sort((a, b) => (a?.price || 0) - (b?.price || 0));

  const columns: ('free' | 'pro')[] = [];
  const features: {
    description: string;
    feature: string;
    free?: boolean;
    pro?: boolean;
  }[] = [];

  if (sortedList?.length) {
    if (!sortedList[0]?.price) {
      sortedList[0]?.features?.forEach((eachFeature) => {
        features?.push({
          description: eachFeature?.description,
          feature: eachFeature?.feature_name,
          free: true,
        });
      });
      columns?.push('free');

      if (sortedList?.length !== 1) {
        sortedList[sortedList?.length - 1]?.features?.forEach((eachFeature) => {
          const findedItem = features?.find(
            (eachFeatureOld) =>
              eachFeatureOld.feature === eachFeature?.feature_name,
          );

          if (findedItem) {
            findedItem.pro = true;
          } else {
            features?.push({
              description: eachFeature?.description,
              feature: eachFeature?.feature_name,
              pro: true,
            });
          }
        });

        columns.push('pro');
      }
    } else {
      columns.push('pro');

      sortedList[sortedList.length - 1]?.features?.forEach((eachFeature) => {
        if (
          !features?.find(
            (eachFeatureOld) =>
              eachFeatureOld.feature === eachFeature?.feature_name,
          )
        ) {
          features?.push({
            description: eachFeature?.description,
            feature: eachFeature?.feature_name,
            pro: true,
          });
        }
      });
    }
  }

  if (!columns?.length) {
    return <div></div>;
  }

  return (
    <div className={styles.featuresList}>
      <h2 className={styles.title}>Features list</h2>
      <div className={styles.feature}>
        <div className={smallScreen ? styles.row_small : styles.row}>
          {!smallScreen && (
            <div className={classNames(styles.eachItem, styles.firstColumn)}>
              <p className={styles.header}>Feature</p>
            </div>
          )}
          {columns?.map((eachItem) => (
            <Fragment key={eachItem}>
              {eachItem === 'free' ? (
                <div className={styles.eachItem}>
                  <p className={styles.header}>Free version</p>
                </div>
              ) : (
                <div className={styles.eachItem}>
                  <p className={styles.header}>
                    <Diamond /> <span>Premium version</span>
                  </p>
                </div>
              )}
            </Fragment>
          ))}
        </div>
        {features?.map((eachItem) => (
          <>
            {smallScreen && (
              <div className={classNames(styles.eachItem, styles.firstColumn)}>
                <p className={classNames(styles.body, styles.featureName)}>
                  {eachItem?.feature}
                </p>
                <p className={styles.desc}>{eachItem?.description}</p>
              </div>
            )}

            <div
              key={eachItem.feature + eachItem.description}
              className={styles.row}
            >
              {!smallScreen && (
                <div
                  className={classNames(styles.eachItem, styles.firstColumn)}
                >
                  <p className={classNames(styles.body, styles.featureName)}>
                    {eachItem?.feature}
                  </p>
                  <p className={styles.desc}>{eachItem?.description}</p>
                </div>
              )}
              {columns?.map((eachColumn) => (
                <div
                  key={eachColumn + eachItem?.feature + eachItem?.description}
                  className={styles.eachItem}
                >
                  <p className={styles.body}>
                    {eachColumn === 'pro' ? (
                      <CheckMArk  alt={'true'}/>
                    ) : eachItem[eachColumn] ? (
                      <CheckMArk alt={'true'} />
                    ) : (
                      <XMArk alt={'false'}/>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
