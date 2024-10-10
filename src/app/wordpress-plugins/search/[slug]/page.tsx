import { notFound } from 'next/navigation';
import Link from 'next/link';

import { PluginsList } from '@/app/wordpress-plugins/search/[slug]/components/pluginsList';

import ChevronRight from '@/app/wordpress-plugin/[slug]/rightIcon.svg';
import getAllPosts from '@/lib/getAllPosts';

import styles from './index.module.scss';

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return {
    description: `Explore top-rated ${slug[0]?.toUpperCase() + slug?.substring(1)} WordPress plugins for to enhance your website's functionality and user experience.`,
    title: `Best ${decodeURIComponent(slug[0]?.toUpperCase() + slug?.substring(1))}  WordPress plugins`,
  };
}
export default async function Post({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const result = await getAllPosts({ query: slug, limit: 9, page: 1 });
  let totalCount;
  if (result) {
    totalCount = result?.metadata?.totalCount;
  } else {
    notFound();
  }
  return (
    <>
      <div className={styles.layoutContent}>
        <main className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href={'/wordpress-plugins/'} scroll>
              All plugins
            </Link>
            <ChevronRight fontSize="small" />
            <p className={styles.name}>
              Search “
              {decodeURIComponent(slug[0]?.toUpperCase() + slug?.substring(1))}“
            </p>
          </div>
          <div className={styles.content}>
            {result?.data?.length > 0 ? (
              <h1 className={styles.title}>
                Your search for{' '}
                <span>
                  “
                  {decodeURIComponent(
                    slug[0]?.toUpperCase() + slug?.substring(1),
                  )}
                  “
                </span>{' '}
                returned these matching plugins ({totalCount})
              </h1>
            ) : (
              <h1 className={styles.title}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Oops! We couldn't find{' '}
                <span>
                  ”
                  {decodeURIComponent(
                    slug[0]?.toUpperCase() + slug?.substring(1),
                  )}
                  ”
                </span>
              </h1>
            )}
            {result?.data?.length > 0 ? (
              <PluginsList data={result} slug={slug} />
            ) : (
              <p className={styles.empty}>
                Consider checking your spelling or trying a different search
                term.{' '}
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
