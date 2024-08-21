import { WithBlackBackground } from '@/app/wordpress-plugins/components/WithBlackBackground/WithBlackBackround';
import { View } from '@/app/wordpress-plugins/components/PerformanceOptimizationPlugins/View';

import getAllPosts from '@/lib/getAllPosts';
import getPost from '@/lib/getPost';

export default async function PerformanceOptimizationPlugins() {
  const data = await getAllPosts({
    category: 'performance-optimization',
    limit: 5,
    page: 1,
  });
  const winner = await getPost('tenweb-speed-optimizer');
  if (!data) {
    return [];
  }

  return (
    <WithBlackBackground>
      <View
        description="Effortlessly discover top-rated plugins tailored to enhance your site, all in one place."
        path={'/wordpress-plugins/performance-optimization'}
        title="Performance optimization plugins"
        data={data?.data}
        winner={winner}
      />
    </WithBlackBackground>
  );
}
