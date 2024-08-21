'use client';

import { FeaturesList } from '@/app/wordpress-plugin/[slug]/components/FeaturesList/FeaturesList';
import { KeyBenefits } from '@/app/wordpress-plugin/[slug]/components/KeyBenefits/KeyBenefits';
import { Overview } from '@/app/wordpress-plugin/[slug]/components/Overview/Overview';

import { IPlugin } from '@/@types/plugin';

export function OverviewTab({ plugin }: { plugin: IPlugin }) {
  return (
    <>
      <Overview content={plugin?.overview} />
      <KeyBenefits plugin={plugin} />
      <FeaturesList plugin={plugin} />
    </>
  );
}
