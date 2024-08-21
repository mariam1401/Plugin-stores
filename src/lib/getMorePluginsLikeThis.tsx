import axios from 'axios';

import { ALTERNATIVES_PAGE_PER_LIMIT } from '@/lib/consts';

export default async function getMorePluginsLikeThis({
  offset,
  limit,
  id,
}: {
  id?: string | number;
  offset?: number;
  limit?: number;
}) {
  try {
    const res = await axios.get(
      `https://plugin-store-api.10web.io/api/public/plugins/${id}/more-plugins-like-this?limit=${limit ?? ALTERNATIVES_PAGE_PER_LIMIT}&offset=${offset || 0}`,
    );
    if (res.status !== 200) {
      return undefined;
    }
    return res.data;
  } catch (error) {
    return undefined;
  }
}
