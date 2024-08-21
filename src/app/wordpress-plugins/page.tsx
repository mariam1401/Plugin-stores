import PerformanceOptimizationPlugins from '@/app/wordpress-plugins/components/PerformanceOptimizationPlugins/PerformanceOptimizationPlugins';
import DesignAndCustomizationPlugins from '@/app/wordpress-plugins/components/DesignAndCustomizationPlugins/DesignAndCustomizationPlugins';
import SeoMarketingPlugins from '@/app/wordpress-plugins/components/SeoMarketingPlugins/SeoMarketingPlugins';
import MostPopularPlugins from '@/app/wordpress-plugins/components/MostPopularPlugins/MostPopularPlugins';
import ECommercePlugins from '@/app/wordpress-plugins/components/ECommercePlugins/ECommercePlugins';
import { PageSearchBox } from '@/app/wordpress-plugins/components/PageSearchBox/PageSearchBox';
import { PageIntro } from '@/app/wordpress-plugins/components/PageIntro/PageIntro';
import Experience from '@/app/wordpress-plugins/components/Experience/Experience';
import BestIntro from '@/app/wordpress-plugins/components/BestIntro/BestIntro';

import styles from './page.module.scss';

export default async function Home() {
  return (
    <>
      <div className={styles.layoutContent}>
        <main>
          <div className={styles.main}>
            <PageIntro />
            <PageSearchBox />
            <div className={styles.divider} />
            <div className={styles.plugins}>
              <MostPopularPlugins />
              <PerformanceOptimizationPlugins />
              <SeoMarketingPlugins />
              <BestIntro />
              <ECommercePlugins />
              <DesignAndCustomizationPlugins />
              <Experience />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
