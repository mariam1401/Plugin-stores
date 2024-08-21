import { PluginsShortView } from '@/app/wordpress-plugins/components/PluginsShortView/PluginsShortView';

import getAllPosts from '@/lib/getAllPosts';

export default async function DesignAndCustomizationPlugins() {
  const { data } = await getAllPosts({
    category: 'design-and-customization',
    limit: 6,
    page: 1,
  });

  return (
    <PluginsShortView
      description="Themes, page builders, and custom design tools for tailoring the appearance of a site."
      path={'design-and-customization'}
      title="Design and customization"
      data={data}
      withTwoColumns
    />
  );
}
