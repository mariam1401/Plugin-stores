import { PluginsShortView } from '@/app/wordpress-plugins/components/PluginsShortView/PluginsShortView';

import getAllPosts from '@/lib/getAllPosts';

export default async function ECommercePlugins() {
  const { data } = await getAllPosts({
    category: 'e-commerce',
    limit: 6,
    page: 1,
  });

  return (
    <PluginsShortView
      description="For creating and managing online stores, including payment gateways and product listings."
      path={'e-commerce'}
      title="E-commerce"
      data={data}
      withTwoColumns
    />
  );
}
