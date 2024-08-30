import { notFound } from 'next/navigation';
import Link from 'next/link';
import he from 'he';

import { GeneralRatingAndReviews } from '@/app/wordpress-plugin/[slug]/reviews/components/GeneralRatingAndReviews/GeneralRatingAndReviews';
import GeneralInfo from '@/app/wordpress-plugin/[slug]/reviews/components/GeneralInfo/GeneralInfo';

import getPostsForGeneration from '@/lib/getPostsForGeneration';
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

  if (!data) {
    return {
      title: 'Plugin Not Found',
    };
  }

  return {
    title: `Review page for ${decodeEntities(data?.plugin_name)}`,
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
  if (!pluginData) {
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
            />
            <ChevronRight fontSize="small" />
            <p className={styles.name}>Reviews</p>
          </div>
          <div className={styles.content}>
            <GeneralInfo plugin={pluginData} text={'Reviews'} />
            <div className={styles.separator} />
            <GeneralRatingAndReviews plugin={pluginData} />
          </div>
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
