import { notFound } from 'next/navigation';
import Link from 'next/link';

import { AboutAuthor } from '@/app/wordpress-plugins/profiles/[slug]/components/AboutAuthor';
import { Developer } from '@/app/wordpress-plugins/profiles/[slug]/components/Developer';
import { Separator } from '@/app/wordpress-plugin/[slug]/components/Separator/Separator';
import { UserInfo } from '@/app/wordpress-plugins/profiles/[slug]/components/UserInfo';

import getAllContributorsSlugs from '@/lib/getAllContributorSlugs';
import getContributor from '@/lib/getContributor';
import { IContributor } from '@/@types/plugin';

import ChevronRight from './rightIcon.svg';

import styles from './page.module.scss';

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getContributor(slug);

  if (!data) {
    return {
      title: 'Page Not Found',
    };
  }
  return {
    description: `Explore WordPress plugins developed by ${data?.author_name} to enhance your website.`,
    title: data?.author_name,
  };
}
export default async function Post({
  params: { slug },
}: {
  params: { contributor: IContributor; slug: string };
}) {
  const data = await getContributor(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className={styles.layoutContent}>
        <main className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href={'/wordpress-plugins'} scroll>
              All plugins
            </Link>
            <ChevronRight fontSize="small" />
            <p
              dangerouslySetInnerHTML={{ __html: data?.author_name || '' }}
              className={styles.name}
            />
          </div>
          <UserInfo data={data} />
          <Separator />
          <AboutAuthor data={data} />
          <div className={styles.line}></div>
          <div className={styles.dev}>
            {data?.developer?.length > 0 && (
              <Developer data={data.developer} title={'Developer'} />
            )}
            {data?.contributor?.length > 0 && (
              <Developer data={data.contributor} title={'Contributor'} />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
export const revalidate = 60;
export async function generateStaticParams() {
  const contributors = await getAllContributorsSlugs();
  if (!contributors) {
    return [];
  }
  return contributors?.map((el: { slug: string }) => ({
    slug: el?.slug?.toString(),
  }));
}
