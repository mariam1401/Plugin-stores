import { notFound } from 'next/navigation';
import { GeneralContent } from '@/app/wordpress-plugins/components/GeneralContent';
import getCategories from '@/lib/getCategories';
import getAllPosts from '@/lib/getAllPosts';
import { ITag } from '@/@types/plugin';
import getTags from '@/lib/getTags';
import getTag from '@/lib/getTag';
import styles from '../../page.module.scss';

export async function generateMetadata({
  params: { slug, tag },
}: {
  params: { slug: string; tag: ITag };
}) {
  let tagData = tag;
  if (!tag) {
    tagData = await getTag({ query: slug });
  }
  if (!tagData) {
    return {
      title: 'Page Not Found',
    };
  }
  return {
    description: `Explore the top ${tagData?.tag ? tagData?.tag[0]?.toUpperCase() + tagData?.tag?.substring(1) : ''} WordPress plugins to find the best one for your website.`,
    title: `Best ${tagData?.tag[0]?.toUpperCase() + tagData?.tag?.substring(1)} WordPress plugins`,
  };
}
export default async function Post({
  params: { slug, tag },
}: {
  params: { slug: string; tag: ITag };
}) {
  let data;
  const categories = await getCategories();
  let tagData = tag;
  if (!tag) {
    tagData = await getTag({ query: slug });
  }
  if (tagData) {
    data = await getAllPosts({
      tag: [slug],
      limit: 10,
      page: 1,
    });
  } else {
    notFound();
  }
  return (
    <>
      <div className={styles.layoutContent}>
        <GeneralContent categories={categories} tag={[tagData]} data={data} />
      </div>
    </>
  );
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const tags = await getTags({ limit:process.env.STAGE === 'dev' ? 100 : 5000000, page: 1 });
  if (!tags) {
    return [];
  }
  return tags?.data?.map((tag: { slug: string }) => ({
    slug: tag?.slug?.toString(),
    tag: tag,
  }));
}
