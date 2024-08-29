import { notFound } from 'next/navigation';
import Link from 'next/link';
import he from 'he';

import { PriceList } from '@/app/wordpress-plugin/[slug]/pricing/components/PriceList/PriceList';
import { Separator } from '@/app/wordpress-plugin/[slug]/components/Separator/Separator';
import { General } from '@/app/wordpress-plugin/[slug]/components/General/General';
import Experience from '@/app/wordpress-plugins/components/Experience/Experience';

import getPluginContributors from '@/lib/getPluginContributors';
import getPostsForGeneration from '@/lib/getPostsForGeneration';
import getReviews from '@/lib/getReviews';
import { IPlugin } from '@/@types/plugin';
import getPost from '@/lib/getPost';

import ChevronRight from './rightIcon.svg';

import styles from './page.module.scss';
function decodeEntities(encodedString?: string) {
  return he.decode(encodedString || '');
}
export async function generateMetadata({
  params: { plugin, slug },
}: {
  params: { plugin: IPlugin; slug: string };
}) {
  let data = plugin;
  if (!plugin) {
    data = await getPost(slug);
  }
  if (!data || !(data?.price_list?.length > 0)) {
    return {
      title: 'Page Not Found',
    };
  }
  return {
    title: `Pricing page for ${decodeEntities(data?.plugin_name)}`,
    description: decodeEntities(data?.short_title),
  };
}
export default async function Post({
  params: { plugin, slug },
}: {
  params: { plugin: IPlugin; slug: string };
}) {
  let pluginData = plugin;
  if (!plugin) {
    pluginData = await getPost(slug);
  }
  const reviews = await getReviews({ slug: slug, offset: 0, limit: 1 });
  const contributor = await getPluginContributors({
    slug: slug,
    offset: 0,
    limit: 1,
  });
  if (!pluginData || !(pluginData?.price_list?.length > 0)) {
    notFound();
  }
  return (
    <>
      <div className={styles.layoutContent}>
        <main className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href={'/wordpress-plugins'} scroll>
              All Plugins
            </Link>
            <ChevronRight fontSize="small" />
            <Link
              dangerouslySetInnerHTML={{
                __html: pluginData?.plugin_name || '',
              }}
              href={`/wordpress-plugin/${slug}`}
              scroll
            ></Link>
            <ChevronRight fontSize="small" />
            <p className={styles.name}>Pricing</p>
          </div>
          <div className={styles.content}>
            <div className={styles.block}>
              <General
                reviews={reviews?.metadata?.totalCount}
                author={contributor?.data}
                plugin={pluginData}
                text={'Pricing'}
              />
            </div>
          </div>
          <Separator />
          <PriceList plugin={pluginData} />
          <Experience />
        </main>
      </div>
    </>
  );
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const pluginSlugs = await getPostsForGeneration();
  if (!pluginSlugs) {
    return [];
  }
  return pluginSlugs?.map((post: string) => ({
    slug: post?.toString(),
  }));
}
