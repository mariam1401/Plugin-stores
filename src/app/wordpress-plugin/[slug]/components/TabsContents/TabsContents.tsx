'use client';

import { useState } from 'react';

import { useMediaQuery } from '@mui/material';
import classNames from 'classnames';

import { InstallationInstructionsTab } from '@/app/wordpress-plugin/[slug]/components/InstallationInstructionsTab/InstallationInstructionsTab';
import { CustomerSupportTab } from '@/app/wordpress-plugin/[slug]/components/CustomerSupportTab/CustomerSupportTab';
import { ChangelogTab } from '@/app/wordpress-plugin/[slug]/components/ChangelogTab/ChangelogTab';
import { MainBenefits } from '@/app/wordpress-plugin/[slug]/components/MainBenefits/MainBenefits';
import { OverviewTab } from '@/app/wordpress-plugin/[slug]/components/OverviewTab/OverviewTab';
import { AboutPlugin } from '@/app/wordpress-plugin/[slug]/components/AboutPlugin/AboutPlugin';
import { Separator } from '@/app/wordpress-plugin/[slug]/components/Separator/Separator';

import { IContributor, IPlugin } from '@/@types/plugin';

import { CompatibilityTab } from '../CompatibilityTab/CompatibilityTab';

import styles from './tabsContents.module.scss';

export function TabsContents({
  contributor,
  plugin,
}: {
  contributor: IContributor[];
  plugin: IPlugin;
}) {
  const [tabId, setTabId] = useState('overview');
  const middleScreen = useMediaQuery('(max-width:1260px)');
  const smallScreen = useMediaQuery('(max-width:768px)');

  return (
    <>
      {middleScreen && <Separator color={'#eaeaea'} />}
      {!middleScreen && (
        <div className={styles.container}>
          <h4
            className={classNames({
              [styles.selected]: tabId === 'overview',
            })}
            onClick={() => setTabId('overview')}
          >
            Overview
          </h4>
          {(plugin?.plugin_compatibilities?.length ||
            plugin?.external_integration_capabilities?.descriptions ||
            plugin?.external_integration_capabilities?.summary) && (
            <h4
              className={classNames({
                [styles.selected]: tabId === 'compatibility',
              })}
              onClick={() => setTabId('compatibility')}
            >
              Compatibility
            </h4>
          )}

          {plugin?.installation_instructions && (
            <h4
              className={classNames({
                [styles.selected]: tabId === 'installationInstructions',
              })}
              onClick={() => setTabId('installationInstructions')}
            >
              Installation instructions
            </h4>
          )}

          <h4
            className={classNames({
              [styles.selected]: tabId === 'customerSupport',
            })}
            onClick={() => setTabId('customerSupport')}
          >
            Customer support & learning resources
          </h4>
          {plugin?.changelog?.length && (
            <h4
              className={classNames({
                [styles.selected]: tabId === 'changelog',
              })}
              onClick={() => setTabId('changelog')}
            >
              Changelog
            </h4>
          )}
        </div>
      )}
      <div className={styles.block}>
        <div className={styles.side}>
          <MainBenefits plugin={plugin} />
          {smallScreen && <Separator color={'#EAEAEA'} />}
          <AboutPlugin contributor={contributor} plugin={plugin} />
        </div>
        {middleScreen && (
          <div className={styles.container}>
            <h4
              className={classNames({
                [styles.selected]: tabId === 'overview',
              })}
              onClick={() => setTabId('overview')}
            >
              Overview
            </h4>
            {(plugin?.plugin_compatibilities?.length ||
              plugin?.external_integration_capabilities?.descriptions ||
              plugin?.external_integration_capabilities?.summary) && (
              <h4
                className={classNames({
                  [styles.selected]: tabId === 'compatibility',
                })}
                onClick={() => setTabId('compatibility')}
              >
                Compatibility
              </h4>
            )}

            {plugin?.installation_instructions && (
              <h4
                className={classNames({
                  [styles.selected]: tabId === 'installationInstructions',
                })}
                onClick={() => setTabId('installationInstructions')}
              >
                Installation instructions
              </h4>
            )}

            <h4
              className={classNames({
                [styles.selected]: tabId === 'customerSupport',
              })}
              onClick={() => setTabId('customerSupport')}
            >
              Customer support & learning resources
            </h4>
            {plugin?.changelog?.length && (
              <h4
                className={classNames({
                  [styles.selected]: tabId === 'changelog',
                })}
                onClick={() => setTabId('changelog')}
              >
                Changelog
              </h4>
            )}
          </div>
        )}
        <div className={styles.main}>
          {tabId === 'overview' && <OverviewTab plugin={plugin} />}

          {tabId === 'compatibility' && <CompatibilityTab plugin={plugin} />}
          {tabId === 'installationInstructions' && (
            <InstallationInstructionsTab plugin={plugin} />
          )}
          {tabId === 'customerSupport' && (
            <CustomerSupportTab plugin={plugin} />
          )}
          {tabId === 'changelog' && <ChangelogTab plugin={plugin} />}
        </div>
      </div>
    </>
  );
}
