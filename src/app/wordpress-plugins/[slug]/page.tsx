import { notFound } from 'next/navigation';

import { GeneralContent } from '@/app/wordpress-plugins/components/GeneralContent';

import getCategories from '@/lib/getCategories';
import getAllPosts from '@/lib/getAllPosts';
import { ICategory } from '@/@types/plugin';

import styles from '../page.module.scss';

export async function generateMetadata({
  params: { category, slug },
}: {
  params: { category: ICategory; slug: string };
}) {
  let categoryData = category;
  if (!category) {
    const categories = await getCategories();
    categoryData = categories?.filter(
      (el: { slug: string }) => el?.slug === slug,
    )[0];
  }

  if (!categoryData && slug !== 'all') {
    return {
      title: 'Page Not Found',
    };
  }
  return {
    description: `Explore top-rated ${categoryData?.category ? categoryData?.category : ''} WordPress plugins for to enhance your website's functionality and user experience.`,
    title:
      slug === 'all'
        ? 'Best WordPress plugins'
        : `Best ${categoryData?.category}  WordPress plugins`,
  };
}
export default async function Post({
  params: { category, slug },
}: {
  params: { category: ICategory; slug: string };
}) {
  let data;
  let categoryData = category;
  const categories = await getCategories();
  if (!category) {
    categoryData = categories?.filter(
      (el: { slug?: string }) => el?.slug === slug,
    )[0];
  }

  if (!categoryData?.category && slug !== 'all') {
    notFound();
  } else {
    data = await getAllPosts({
      category: slug === 'all' ? '' : slug ? slug : '',
      limit: 10,
      page: 1,
    });
  }
  return (
    <>
      <div className={styles.layoutContent}>
        <GeneralContent
          categories={categories}
          category={categoryData}
          data={data}
        />
      </div>
    </>
  );
}

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories?.map((cat: { slug: string }) => ({
    slug: cat?.slug?.toString(),
    category: cat,
  }));
}
