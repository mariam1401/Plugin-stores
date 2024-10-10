import { notFound } from 'next/navigation';
import Link from 'next/link';
import he from 'he';

import MostPopularAlternatives from '@/app/wordpress-plugin/[slug]/alternatives/components/MostPopularAlternatives/MostPopularAlternatives';
import AllAlternatives from '@/app/wordpress-plugin/[slug]/alternatives/components/AllAlternatives/AllAlternatives';
import GeneralInfo from '@/app/wordpress-plugin/[slug]/alternatives/components/GeneralInfo/GeneralInfo';
import Experience from '@/app/wordpress-plugin/[slug]/components/Experience/Experience';

import getMorePluginsLikeThis from '@/lib/getMorePluginsLikeThis';
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
    title: `Alternatives page for ${decodeEntities(data?.plugin_name)}`,
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
  let more_plugins = [];
  if (pluginData?.plugin_id) {
    more_plugins = await getMorePluginsLikeThis({
      id: pluginData?.plugin_id,
      limit: 4,
    });
  }

  return (
    <>
      <div className={styles.layoutContent}>
        <main className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href={'/wordpress-plugins/'} scroll>
              Home
            </Link>
            <ChevronRight fontSize="small" />
            <Link href={'/wordpress-plugin/'} scroll>
              Plugins store
            </Link>
            <Link
              dangerouslySetInnerHTML={{
                __html: pluginData?.plugin_name || '',
              }}
              href={`/wordpress-plugin/${slug}/`}
              scroll
            />
            <ChevronRight fontSize="small" />
            <p className={styles.name}>More plugins like this</p>
          </div>
          <div className={styles.content}>
            <GeneralInfo plugin={pluginData} />
            <MostPopularAlternatives
              name={pluginData?.plugin_name || ''}
              morePlugins={more_plugins?.data}
            />
            <AllAlternatives plugin={pluginData} />
            <Experience />
          </div>
        </main>
      </div>
    </>
  );
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  let pluginSlugs = await getPostsForGeneration();
  if (!pluginSlugs) {
    return [];
  }
  if(process.env.STAGE === 'dev'){
    pluginSlugs =  pluginSlugs?.slice(0,100)
  }
  return pluginSlugs?.map((post: string) => ({
    slug: post?.toString(),
  }));
}
