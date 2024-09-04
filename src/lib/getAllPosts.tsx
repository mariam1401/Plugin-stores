import axios from 'axios';
import { PAGE_PER_LIMIT } from '@/lib/consts';

export default async function getAllPosts({
  installationsRange,
  ratingRange,
  category,
  query,
  limit,
  page,
  tag,
  php,
  wp,
}: {
  installationsRange?: null | [];
  category?: string | null;
  ratingRange?: null | [];
  query?: string | null;
  tag?: string[] | [];
  limit?: number;
  page: number;
  php?: string;
  wp?: string;
}) {
  try {
    const res = await axios.get(
      //@ts-ignore
      `https://9pie1fvxyi.execute-api.us-east-1.amazonaws.com/api/elasticsearch/find?limit=${limit ?? PAGE_PER_LIMIT}&offset=${(page - 1) * (limit ?? PAGE_PER_LIMIT)}${query ? `&query=${query}` : ''}${category ? `&category-slug=${category}` : ''}${php ? `&php-version=${php}` : ''}${wp ? `&wp-version=${wp}` : ''}${tag && tag?.length > 0 ? `&tag-slugs=${tag[0]}` : ''}${tag && tag?.length > 1 ? `&tag-slugs=${tag[1]}` : ''}${tag && tag?.length > 2 ? `&tag-slugs=${tag[2]}` : ''}${tag && tag?.length > 3 ? `&tag-slugs=${tag[3]}` : ''}${tag && tag?.length > 4 ? `&tag-slugs=${tag[4]}` : ''}${tag && tag?.length > 5 ? `&tag-slugs=${tag[5]}` : ''}${ratingRange ? `&rating-range=${ratingRange[0]}-${ratingRange[1]}` : ''}${installationsRange ? `&active-installations-range=${installationsRange[0]}-${installationsRange[1]}` : ''}`,
    );
    if (res.status !== 200) {
      return undefined;
    }
    return res.data;
  } catch (error) {
    return undefined;
  }
}
