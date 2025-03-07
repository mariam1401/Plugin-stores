import axios from 'axios';

import { ALTERNATIVES_PAGE_PER_LIMIT } from '@/lib/consts';

export default async function getMorePluginsLikeThis({
  offset,
  limit,
  id,
}: {
  id?: string | number;
  offset?: string;
  limit?: number;
}) {
  try {
    const res = await axios.get(
      `https://9pie1fvxyi.execute-api.us-east-1.amazonaws.com/api/public/plugins/${id}/more-plugins-like-this?limit=${limit ?? ALTERNATIVES_PAGE_PER_LIMIT}${offset && `&offset=${encodeURIComponent(offset)}`}`,
    );
    if (res.status !== 200) {
      return undefined;
    }
    return res.data;
  } catch (error) {
    return undefined;
  }
}
