import { ViewAlternatives } from '@/app/wordpress-plugin/[slug]/alternatives/components/MostPopularAlternatives/ViewAlternatives';
import { WithBlackBackground } from '@/app/wordpress-plugins/components/WithBlackBackground/WithBlackBackround';

import { IPlugin } from '@/@types/plugin';

export default async function MostPopularAlternatives({
  morePlugins,
  name,
}: {
  morePlugins: IPlugin['more_plugins_like_this']['data'];
  name: string;
}) {
  return (
    <WithBlackBackground>
      <ViewAlternatives
        title={
          <p>
            Most popular{' '}
            <span dangerouslySetInnerHTML={{ __html: name || '' }} />{' '}
            alternatives
          </p>
        }
        data={morePlugins}
      />
    </WithBlackBackground>
  );
}
