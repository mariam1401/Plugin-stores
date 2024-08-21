import { PluginsShortView } from '@/app/wordpress-plugins/components/PluginsShortView/PluginsShortView';

import getAllPosts from '@/lib/getAllPosts';

export default async function MostPopularPlugins() {
  const { data } = await getAllPosts({
    limit: 6,
    page: 1,
  });

  return (
    <PluginsShortView
      title="Most popular WordPress plugins"
      data={data}
      withActiveInstallations
    />
  );
}
