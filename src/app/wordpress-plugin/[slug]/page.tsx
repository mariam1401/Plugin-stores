import { notFound } from 'next/navigation';
import Link from 'next/link';
import he from 'he';

import { RatingAndReviews } from '@/app/wordpress-plugin/[slug]/components/RatingAndReviews/RatingAndReviews';
import { TabsContents } from '@/app/wordpress-plugin/[slug]/components/TabsContents/TabsContents';
import { Separator } from '@/app/wordpress-plugin/[slug]/components/Separator/Separator';
import { Pricing } from '@/app/wordpress-plugin/[slug]/components/Pricing/Pricing';
import { General } from '@/app/wordpress-plugin/[slug]/components/General/General';
import { AddOns } from '@/app/wordpress-plugin/[slug]/components/AddOns/AddOns';
import { FAQ } from '@/app/wordpress-plugin/[slug]/components/FAQ/FAQ';

import getMorePluginsLikeThis from '@/lib/getMorePluginsLikeThis';
import getPluginContributors from '@/lib/getPluginContributors';
import getPostsForGeneration from '@/lib/getPostsForGeneration';
import getReviews from '@/lib/getReviews';
import getPost from '@/lib/getPost';

import ChevronRight from './rightIcon.svg';
import styles from './page.module.scss';
import Script from "next/script";
import {calculateRatingSummary} from "@/lib/getAverageRating";
import {sortPriceList} from "@/lib/sortPriceList";
import {IPricing} from "@/@types/plugin";

function decodeEntities(encodedString: string) {
  return he.decode(encodedString || '');
}

export async function generateMetadata({ params: { plugin, slug } }: { params: { slug: string; plugin: any } }) {
  let data = plugin;
  if (!plugin) {
    data = await getPost(slug);
  }
  if (!data) {
    return { title: 'Plugin Not Found' };
  }
  return {
    description: decodeEntities(data?.short_title),
    title: decodeEntities(data?.plugin_name),
  };
}

export default async function Post({ params: { plugin, slug } }: { params: { slug: string; plugin: any } }) {
  let pluginData = plugin;
  if (!pluginData) {
    pluginData = await getPost(slug);
  }
  let more_plugins = [];
  let reviews;
  let contributor;
  let prices:IPricing[] = []
  if (pluginData?.plugin_id) {
    more_plugins = await getMorePluginsLikeThis({ id: pluginData?.plugin_id, offset: '', limit: 4 });
    reviews = await getReviews({ slug: pluginData?.plugin_slug, offset: 0, limit: 5 });
    contributor = await getPluginContributors({ slug, offset: 0, limit: 1 });
    prices = sortPriceList(pluginData?.price_list) || []
  }

  if (!pluginData) {
    notFound();
  }

  return (
      <>
        <Script
              dangerouslySetInnerHTML={{
            __html: `{
                      "@context": "https://schema.org/",
                      "@type": "Product",
                      "name": "${decodeEntities(pluginData?.plugin_name || '')}",
                      "image": "${pluginData?.logo || ''}",
                      "offers": ${prices?.length > 1 ? `[
                          {
                              "@type": "Offer",
                              "priceCurrency": "USD",
                              "price": "${prices[0]?.price}",
                              "availability": "https://schema.org/OnlineOnly",
                              "url": "https://10web.io/wordpress-plugin/${pluginData?.plugin_slug}/pricing/"
                          },
                          {
                              "@type": "Offer",
                              "priceCurrency": "USD",
                              "price": "${prices[prices?.length - 1]?.price}",
                              "availability": "https://schema.org/OnlineOnly",
                              "url": "https://10web.io/wordpress-plugin/${pluginData?.plugin_slug}/pricing/"
                          }
                      ]` : prices?.length === 1 ?
                `[
                               {
                                  "@type": "Offer",
                                  "priceCurrency": "USD",
                                  "price": "${prices[0]?.price}",
                                  "availability": "https://schema.org/OnlineOnly",
                               },
                            ]` : '[]'}, 
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "${calculateRatingSummary(pluginData?.rating_by_stars)?.averageRating}",
                        "ratingCount": "${reviews?.metadata?.totalCount}",
                        "bestRating": "5",
                        "worstRating": "1"
                      },
                      "description": "${decodeEntities(pluginData?.short_title || '')}",
                      "brand": "${contributor?.data[0]?.author_name || ''}"
                    }`
          }}/>
        <div className={styles.layoutContent}>
          <main className={styles.container}>
            <div className={styles.breadcrumb}>
              <Link href={'/wordpress-plugins'} scroll>
                All plugins
              </Link>
              <ChevronRight fontSize="small" />
              <Link href={`/wordpress-plugins/${pluginData?.category?.slug}`} scroll>
                {pluginData?.category?.category}
              </Link>
              <ChevronRight fontSize="small" />
              <p dangerouslySetInnerHTML={{ __html: pluginData?.plugin_name || '' }} className={styles.name} />
            </div>
            <div className={styles.content}>
              <div className={styles.block}>
                <General reviews={reviews?.metadata?.totalCount} author={contributor?.data} plugin={pluginData} />
              </div>
              <TabsContents contributor={contributor?.data} plugin={pluginData} />
              <Separator />
              <Pricing plugin={pluginData} />
              <RatingAndReviews hasMore={reviews?.metadata?.totalCount > 5} plugin={pluginData} reviews={reviews} />
              {more_plugins?.data?.length > 3 && (
                  <AddOns morePlugins={more_plugins || []} title="More plugins like this" />
              )}
              <FAQ plugin={pluginData} />
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
  if (process.env.STAGE === 'dev') {
    pluginSlugs = pluginSlugs?.slice(0, 100);
  }
  return pluginSlugs?.map((post: string) => ({
    slug: post?.toString(),
  }));
}
