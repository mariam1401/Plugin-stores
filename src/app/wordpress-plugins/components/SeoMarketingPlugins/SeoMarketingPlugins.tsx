import { PluginsShortView } from '@/app/wordpress-plugins/components/PluginsShortView/PluginsShortView';

import getAllPosts from '@/lib/getAllPosts';

export default async function SeoMarketingPlugins() {
  const data = await getAllPosts({
    category: 'seo-and-marketing',
    limit: 6,
    page: 1,
  });

  if (!data) {
    return [];
  }

  return (
    <PluginsShortView
      description="Plugins that improve website speed, caching, and overall performance."
      title="SEO and Marketing plugins"
      path={'seo-and-marketing'}
      data={data?.data}
      withActiveInstallations
    />
  );
}
